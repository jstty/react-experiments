import axios from 'axios'

const STATS = {
  _CAP: 'STATS_CAP',
  _SP:  'STATS_SP',
  _WL:  'STATS_WL'
};
STATS.CAP = {
  PENDING: `${STATS._CAP}_PENDING`,
  FULFILLED: `${STATS._CAP}_FULFILLED`,
  REJECTED: `${STATS._CAP}_REJECTED`
};
STATS.SP = {
  PENDING: `${STATS._SP}_PENDING`,
  FULFILLED: `${STATS._SP}_FULFILLED`,
  REJECTED: `${STATS._SP}_REJECTED`
};
STATS.WL = {
  PENDING: `${STATS._WL}_PENDING`,
  FULFILLED: `${STATS._WL}_FULFILLED`,
  REJECTED: `${STATS._WL}_REJECTED`
};

function fetchCapHistory(range, cap) {
  return {
    type: STATS._CAP,
    // HTTP request to API
    payload: axios.get(`/api/v1.0/stats/cap/history`, {
      params: {
        start: range.start,
        end:   range.end,
        cap:   cap
      }
    })
  }
}

function fetchSPHistory(range) {
  return {
    type: STATS._SP,
    // HTTP request to API
    payload: axios.get(`/api/v1.0/stats/sp/history`, {
      params: {
        start: range.start,
        end:   range.end
      }
    })
  }
}

function fetchWinLose(range, cap) {
  return {
    type: STATS._WL,
    // HTTP request to API
    payload: axios.get(`/api/v1.0/stats/cap/winloss`, {
      params: {
        start: range.start,
        end:   range.end,
        cap:   cap
      }
    })
  }
}

export {
  STATS,
  fetchCapHistory,
  fetchSPHistory,
  fetchWinLose
}
