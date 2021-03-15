import * as Types from '../actions/actionTypes'

const initialState = {
    logs: [],
    logsLoadError: "",
    loading: false,
    logSaved: false,
    logSaveError: "",
    singleLog: {},
    singleLogLoadError: "",
    singleLogLoading: false,
    logReport: {
      error: "",
      data: {},
      loading: false,
    }
}

function timeLogReducer(state = initialState, action) {
    switch (action.type) {
        case Types.TIME_LOGS_LOADED: {
            return {
                ...state,
                logs: action.payload
            }
        }
        case Types.TIME_LOGS_LOAD_ERROR: {
            return {
                ...state,
                logsLoadError: action.payload.message ? action.payload.message : ""
            }
        }
        case Types.TIME_LOGS_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case Types.TIME_LOG_SAVED: {
            return {
                ...state,
                logSaved: action.payload
            }
        }
        case Types.TIME_LOG_SAVE_ERROR: {
            return {
                ...state,
                logSaveError: action.payload.message ? action.payload.message : ""
            }
        }
        case Types.TIME_LOG_LOADED: {
            return {
                ...state,
                singleLog: action.payload
            }
        }
        case Types.TIME_LOG_LOAD_ERROR: {
            return {
                ...state,
                singleLogLoadError: action.payload.detail ? action.payload.detail : ""
            }
        }
        case Types.TIME_LOG_LOADING: {
            return {
                ...state,
                singleLogLoading: action.payload
            }
        }
        case Types.LOG_REPORT_ERROR_OCCURED: {
          return {
            ...state,
            logReport: {
              loading: false,
              error: action.payload,
              data: {}
            }
          }
        }
        case Types.LOG_REPORT_LOADED: {
          return {
            ...state,
            logReport: {
              loading: false,
              error: "",
              data: action.payload
            }
          }
        }
        case Types.LOG_REPORT_LOADING: {
          return {
            ...state,
            logReport: {
              ...state.logReport,
              loading: action.payload
            }
          }
        }
        default: return state
    }
}

export default timeLogReducer