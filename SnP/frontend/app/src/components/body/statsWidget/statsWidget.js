import React from 'react';
import ReactDOM from 'react-dom';

import AdjustmentPanel from './adjustmentPanel/adjustmentPanel.js';
import GraphPanel from './graphPanel/graphPanel.js'
import WinLose from './winLose/winLose.js'

import style from './statsWidget.css';

export default class StatsWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <div className={style.statsWidget}>
                <AdjustmentPanel />
                <GraphPanel />
                <WinLose />
            </div>
        )
    }
};
