import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { LineGraph } from '../../../graphs/graphs.js';

import style from './graphPanel.css';

export default class GraphPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={style.graphPanel}>
                <div className="container">
                    <div className="columns">
                        <div className="column col-3"><h4>Balance</h4></div>
                        <div className="column col-9">
                            <LineGraph />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
