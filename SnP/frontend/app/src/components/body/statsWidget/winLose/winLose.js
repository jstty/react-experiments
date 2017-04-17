import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import style from './winLose.css';

class WinLose extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let { data } = this.props;

        return (
            <div className={style.winLose}>
                <div className="container">
                    <div className="columns">
                        <div className="column col-2"><h5>Win</h5></div>
                        <div className="column col-2"><h5>{data.win ? data.win.length : 0}</h5></div>
                    </div>
                    <div className="columns">
                        <div className="column col-2"><h5>Lose</h5></div>
                        <div className="column col-2"><h5>{data.lose ? data.lose.length : 0}</h5></div>
                    </div>
                </div>
            </div>
        )
    }
};

function mapStateToProps(state, ownProps) {
    ownProps = !_.isEmpty(ownProps) ? ownProps : {};
    
    // only if state type from stats
    if(state.Stats && state.Stats.winLoseFetch) {
        return _.merge(_.cloneDeep(ownProps), state.Stats.winLoseFetch);
    }
    else {
        return ownProps;
    }
}

export default connect(mapStateToProps)(WinLose);
