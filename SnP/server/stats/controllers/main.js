class StatsCtrl {
    constructor ($logger){
        $logger.log('Stats Ctrl Init');
    }

    // GET localhost:8000/api/v1.0/stats/cap/history?start=2000-01-01&end=2008-01-01&cap=0.04
    * capHistory (db, $input, $done) {
        let range = {
            start: $input.query.start,
            end: $input.query.end
        };
        let cap = parseFloat($input.query.cap);
        let results = yield db.getHistoricalCap(range, cap);
        // send results back (responce), with default 200 status
        $done(results);
    }

    // GET localhost:8000/api/v1.0/stats/sp/history?start=2000-01-01&end=2008-01-01
    * spHistory (db, $input, $done) {
        let range = {
            start: $input.query.start,
            end: $input.query.end
        };
        let results = yield db.getHistoricalSP(range);
        // send results back (responce), with default 200 status
        $done(results);
    }

    // GET localhost:8000/api/v1.0/stats/cap/winloss?start=2000-01-01&end=2008-01-01&cap=0.04
    * winloss (db, $input, $done) {
        let range = {
            start: $input.query.start,
            end: $input.query.end
        };
        let cap = parseFloat($input.query.cap);
        let results = yield db.getWinLoses(range);
        // send results back (responce), with default 200 status
        $done(results);
    }
}

module.exports = StatsCtrl;