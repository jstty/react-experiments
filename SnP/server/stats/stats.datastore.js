const fs  = require('fs');
const path = require('path');
const _  = require('lodash');
const co  = require('co');
const moment = require('moment');
const csvjson = require('csvjson');
const knex = require('knex');

// data store for stats
class DataStore {
    constructor($logger, $q, $config){
        this.L = $logger;
        this.Q = $q;
        this.config = $config;

        // create knex using config
        this.db = knex(this.config.db);
    }

    $postStartInit() {
        let csvData = fs.readFileSync(path.join(__dirname, 'data', '1997-2017.csv'), { encoding : 'utf8'});
        let data = csvjson.toObject(csvData, {
            delimiter: ',',
            quote: '"'
        });
        data = this._processData(data);

        let self = this;
        return co(function *(){
            yield self._initDB();
            yield self._addDataToDB(data);
        });
    }

    _initDB() {
        return this.db.schema.createTable('history', function (table){
            table.increments('id').primary();
            table.integer('date');
            table.float('sp');
            table.float('change');
            table.float('dividend');
            table.float('earnings');
            table.float('cpi');
            table.float('longInterestRate');
            table.float('realPrice');
            table.float('realDividend');
            table.float('realEarnings');
            table.float('PE');
        });
    }

    * _addDataToDB(data) {
        let chunkSize = 50;
        let results = yield this.db
            .batchInsert('history', data, chunkSize)
            .returning('id');
    }

    * getWinLoses(range={ start: '2000-01-01', end: '2008-01-01'}, cap=0.04) {
        try {
            let results = yield this.db('history')
                .whereBetween('date', [moment(range.start).unix(), moment(range.end).unix()])
                .select();

            let winLose = { win: [], lose: []};
            let capSum = 0;
            let spSum = 0;

            // build winLose List
            _.forEach(results, (month) => {
                let capChange = month.sp * cap;
                let dateStr = moment(month.date*1000).format('YYYY-MM-DD');
                // can't go lower then 0
                if(month.change < 0) {
                    capSum += 0;
                    winLose.win.push({ date: dateStr, value: capSum, change: month.change })
                }
                // CAP change
                else if(month.change > 0 && month.change > capChange) {
                    capSum += capChange;
                    winLose.lose.push({ date: dateStr, value: capSum, change: month.change })
                }
            });
            
            // returned as object, for security and uniform response format
            return winLose;
        }
        catch(err) {
            this.L.error('getWinLoses Error:', err);
            return { items: [], error: 'server error'};
        }
    }

    //  use generator function as async/await is not supported in 6.x
    * getHistoricalCap(range={ start: '2000-01-01', end: '2008-01-01'}, cap=0.04) {
        try {
            let results = yield this.db('history')
                .whereBetween('date', [moment(range.start).unix(), moment(range.end).unix()])
                .select();

            let min = Number.POSITIVE_INFINITY;
            let max = Number.NEGATIVE_INFINITY;
            let capSum = 0;
            let spSum = 0;
            let capList = [];

            // build capList
            _.forEach(results, (month) => {
                let capChange = month.sp * cap;
                let dateStr = moment(month.date*1000).format('YYYY-MM-DD');

                // alway sum change
                spSum += month.change;
                
                // can't go lower then 0
                if(month.change < 0) {
                    capSum += 0;
                    capList.push({ date: dateStr, value: capSum, win: true })
                }
                // CAP change
                else if(month.change > 0 && (month.change > capChange)) {
                    capSum += capChange;
                    capList.push({ date: dateStr, value: capSum, loose: true });
                }
                // othewise same change as SP
                else {
                    capSum += month.change;
                    capList.push({ date: dateStr, value: capSum })
                }

                if(capSum < min) { min = capSum; }
                if(capSum > max) { max = capSum; }
                if(spSum < min)  { min = spSum; }
                if(spSum > max)  { max = spSum; }
            });
            
            // returned as object, for security and uniform response format
            return {
                min: min,
                max: max,
                items: capList
            }
        }
        catch(err) {
            this.L.error('getHistoricalCap Error:', err);
            return { items: [], error: 'server error'};
        }
    }

    * getHistoricalSP(range={ start: '2000-01-01', end: '2008-01-01'}) {
        try {
            let results = yield this.db('history')
                .whereBetween('date', [moment(range.start).unix(), moment(range.end).unix()])
                .select();
                
            let min = Number.POSITIVE_INFINITY;
            let max = Number.NEGATIVE_INFINITY;
            let spSum = 0;
            let spList = [];

            // build capList
            _.forEach(results, (month) => {
                let dateStr = moment(month.date*1000).format('YYYY-MM-DD');

                 // alway sum change
                spSum += month.change;

                spList.push({ date: dateStr, value: spSum });

                if(spSum < min)  { min = spSum; }
                if(spSum > max)  { max = spSum; }
            });

            // returned as object, for security and uniform response format
            return {
                min: min,
                max: max,
                items: spList
            }
        }
        catch(err) {
            this.L.error('getHistoricalSP Error:', err);
            return { items: [], error: 'server error'};
        }
    }

    _processData(data) {
        data = _.cloneDeep(data); // use copy not orignal (ensure to not mutate passed in data set)

        let previousMonthData = { sp: 0 };
        _.map(data, (oneMonthData) => {
            _.forEach(oneMonthData, (value, key) => {
                // convert all but date to float
                if(key === 'date') {
                    oneMonthData[key] = moment(value).unix();
                } else {
                    oneMonthData[key] = parseFloat(value);
                }

                // convert all NaN to null
                if(_.isNaN(oneMonthData[key])) {
                    oneMonthData[key] = null;
                }
            });

            oneMonthData.change = oneMonthData.sp - previousMonthData.sp;
            previousMonthData = oneMonthData;
            return oneMonthData;
        });

        // console.log('data:', data);
        return data;
    }
}

module.exports = DataStore;
