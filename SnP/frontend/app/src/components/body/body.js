import React from 'react';
import ReactDOM from 'react-dom';

import StatsWidget from './statsWidget/statsWidget.js';

import style from './body.css';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <div className={style.body}>
                <StatsWidget />
            </div>
        )
    }
};
