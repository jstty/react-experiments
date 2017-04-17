import React from 'react';

import Body from './components/body/body.js';

import styles from './app.css';
import spectre from '../../node_modules/spectre.css/docs/dist/spectre.min.css'

export default class App extends React.Component {
  render() {
    return (
        <div className={styles.app}>
          <Body />
        </div>
    )
  }
}
