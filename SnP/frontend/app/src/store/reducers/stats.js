import { combineReducers } from 'redux';
import { STATS } from '../actions/stats';
import lodash from 'lodash';

const initState = {
  isFetching: false,
  fetched: false,
  data: [],
  error: null
};

function capFetch(state = initState, action) {
  switch (action.type) {
    case STATS.CAP.PENDING: {
      return _.merge(_.cloneDeep(initState), {
        isFetching: true
      });
    }
    case STATS.CAP.FULFILLED: {
      return _.merge(_.cloneDeep(initState), {
        fetched: true,
        data: action.payload.data
      });
    }
    case STATS.CAP.REJECTED: {
      return _.merge(_.cloneDeep(initState), {
        error: action.payload.data
      });
    }
  }
  return state;
}

function spFetch(state = initState, action) {
  switch (action.type) {
    case STATS.SP.PENDING: {
      return _.merge(_.cloneDeep(initState), {
        isFetching: true
      });
    }
    case STATS.SP.FULFILLED: {
      return _.merge(_.cloneDeep(initState), {
        fetched: true,
        data: action.payload.data
      });
    }
    case STATS.SP.REJECTED: {
      return _.merge(_.cloneDeep(initState), {
        error: action.payload.data
      });
    }
  }
  return state;
}

function winLoseFetch(state = initState, action) {
  switch (action.type) {
    case STATS.WL.PENDING: {
      return _.merge(_.cloneDeep(initState), {
        isFetching: true
      });
    }
    case STATS.WL.FULFILLED: {
      return _.merge(_.cloneDeep(initState), {
        fetched: true,
        data: action.payload.data
      });
    }
    case STATS.WL.REJECTED: {
      return _.merge(_.cloneDeep(initState), {
        error: action.payload.data
      });
    }
  }
  return state;
}


const reducer = combineReducers({
  capFetch,
  spFetch,
  winLoseFetch
})

export default reducer
