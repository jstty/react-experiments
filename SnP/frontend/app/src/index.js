import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import configureStore from './store/configure.js'
import App from './app';

const store = configureStore();

render(
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app', () => { render(App) })
}