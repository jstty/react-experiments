import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import simpleStats from 'simple-statistics';

// only used to build the line string for SVG path
import * as d3 from "d3";

export default class SvgLine extends React.Component {
    constructor(props) {
        super(props);
    }

    getTransformData(data, w, h) {
        // convert date string to number
        data.forEach(function (d) {
            d.date = moment(d.date).unix();
        });

        // get min/max of date and values (used for calc normalized value)
        let dateList = _.map(data, 'date');
        let dateRange = {
            min: simpleStats.min(dateList),
            max: simpleStats.max(dateList)
        };

        let valueRange = {
            min: this.props.min,
            max: this.props.max
        };

        // make sure, order time from old (left), new (right)
        data = data.sort((a, b) => {
            return b.date - a.date;
        });

        // normalize and stretch value to fit width and hight
        data.forEach(function (d) {
            // normalize data to 0.0 -> 1.0
            d.date = (d.date - dateRange.min)/(dateRange.max - dateRange.min);
            // flip data to 1.0 -> 0.0, graph rendered top/left
            d.date = 1.0 - d.date;
            // streach to width
            d.date *= w;

            // normalize data to 0.0 -> 1.0
            d.value = (d.value - valueRange.min)/(valueRange.max - valueRange.min);
            // streach to width
            d.value *= h;
        });

        return data;
    }

    getLine(data, w, h) {
        if(data && data.length > 0) {
            data = this.getTransformData(data, w, h);

            let line = d3.line()
                .x(function (d) { return d.date; })
                .y(function (d) { return d.value; });

            let output = line(data);
            return output;
        }
        else {
            return ""; // do nothing
        }
    }

    render() {
        let margin = {top: 5, right: 5, bottom: 5, left: 5};
        const { style, width, height, lineData } = this.props;
        
        let transform = 'translate(' + margin.left + ',' + margin.top + ')';
        let w = width - (margin.left + margin.right);
        let h = height - (margin.top + margin.bottom);
        
        return (
            <g transform={transform}>
                <path className={`${style} line shadow`} d={this.getLine(this.props.lineData, w, h)} strokeLinecap="round"/>
            </g>
        )
    }
};

SvgLine.propTypes = {
    style: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    lineData: React.PropTypes.array
};
SvgLine.defaultProps = {
    style: 'line',
    width: 800,
    height: 300,
    min: 0,
    max: 99999,
    lineData: []
};
