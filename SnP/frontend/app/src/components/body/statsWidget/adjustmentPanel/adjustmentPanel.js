import style from './adjustmentPanel.css';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import moment from 'moment';

import { fetchCapHistory, fetchSPHistory, fetchWinLose } from '../../../../store/actions/stats';

const Range = Slider.createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const capHandle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value}%`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  );
};

const spHandle = (props) => {
  const { value, dragging, index, ...restProps } = props;

  let year = Math.floor(value/12) + 1997;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={year}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  );
};


class AdjustmentPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // default 3%
            capValue: 3,
            // 1) default to 2000 (1997 + 3), in months
            // 2) default to 2008 (1997 + 11), in months
            spValues: [2000, 2008]
        }
    }

    _getDateFromMonths(year) {
        return moment({year: year, month: 1, day: 1}).format('YYYY-MM-DD');
    }

    _convertRangeToDateRange(range) {
        let dateRange = {
            start: this._getDateFromMonths(range[0]),
            end: this._getDateFromMonths(range[1])
        }
        return dateRange;
    }

    componentDidMount() {
        let capPercValue = this.state.capValue/100; // convert integer to % float
        let dateRange = this._convertRangeToDateRange(this.state.spValues);

        this.props.dispatch( fetchCapHistory(dateRange, capPercValue) );
        this.props.dispatch( fetchSPHistory(dateRange) );
        this.props.dispatch( fetchWinLose(dateRange, capPercValue) );
    }

    onCapChange(value) {
        let capPercValue = value/100; // convert integer to % float
        let dateRange = this._convertRangeToDateRange(this.state.spValues);

        this.setState({ capValue: value });

        this.props.dispatch( fetchCapHistory(dateRange, capPercValue) );
        this.props.dispatch( fetchSPHistory(dateRange) );
        this.props.dispatch( fetchWinLose(dateRange, capPercValue) );
    }

    onSPRangeChange(value) {
        this.setState({ spValues: value });

        let capPercValue = this.state.capValue/100; // convert integer to % float
        let dateRange = this._convertRangeToDateRange(value);

        this.props.dispatch( fetchCapHistory(dateRange, capPercValue) );
        this.props.dispatch( fetchSPHistory(dateRange) );
        this.props.dispatch( fetchWinLose(dateRange, capPercValue) );
    }

    render() {
        return (
            <div className={style.adjustmentPanel}>
                <div className="container">
                    <div className="columns">
                        <div className="column col-3"><h5>Cap</h5></div>
                        <div className="column col-9">
                            <Slider 
                                min={this.props.capMin}
                                max={this.props.capMax}
                                value={this.state.capValue}
                                onChange={(value) => { this.onCapChange(value) } }
                                handle={capHandle}
                            />
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column col-3"><h5>Period</h5></div>
                        <div className="column col-9">
                            <Range 
                                min={this.props.spMin}
                                max={this.props.spMax}
                                value={this.state.spValues}
                                onChange={(value) => { this.onSPRangeChange(value) } }
                                handle={spHandle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

AdjustmentPanel.propTypes = {
    capMin: React.PropTypes.number,
    capMax: React.PropTypes.number,
    spMin: React.PropTypes.number,
    spMax: React.PropTypes.number
};
AdjustmentPanel.defaultProps = {
    capMin: 1,
    capMax: 10,
    spMin: 1997,
    spMax: 2017
};

function mapStateToProps(state, ownProps) {
    ownProps = !_.isEmpty(ownProps) ? ownProps : AdjustmentPanel.defaultProps;
    
    // only if state type from stats
    if(state.Stats) {
        return _.merge(_.cloneDeep(ownProps), state.Stats);
    }
    else {
        return ownProps;
    }
}

export default connect(mapStateToProps)(AdjustmentPanel);
