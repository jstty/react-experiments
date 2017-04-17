import { createStore, applyMiddleware } from 'redux';
// this middleware auto handles promises in actions
import reduxPromise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      reduxPromise(),
      thunk,
      // createLogger()
    )
  )
}