import * as Types from "../actions/actionTypes";

const initialState = {
  request: {
    loading: false,
    status: false,
    error: ""
  },
  reset: {
    loading: false,
    status: false,
    error: ""
  }
};


function forgetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case Types.FORGET_PASSWORD_REQUEST_RESET_LOADING: {
      return {
        ...state,
        request: {
          ...state.request,
          loading: action.payload
        }
      }
    }
    case Types.FORGET_PASSWORD_REQUEST_RESET_SUCCESS: {
      return {
        ...state,
        request: {
          ...state.request,
          error: "",
          status: true
        }
      }
    }
    case Types.FORGET_PASSWORD_REQUEST_RESET_ERROR: {
      return {
        ...state,
        request: {
          ...state.request,
          error: action.payload,
          status: false
        }
      }
    }
    case Types.FORGET_PASSWORD_RESET_LOADING: {
      return {
        ...state,
        reset: {
          ...state.reset,
          loading: action.payload
        }
      }
    }
    case Types.FORGET_PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        reset: {
          ...state.reset,
          error: "",
          status: true
        }
      }
    }
    case Types.FORGET_PASSWORD_RESET_ERROR: {
      return {
        ...state,
        reset: {
          ...state.reset,
          error: action.payload,
          status: false
        }
      }
    }
    default: return state;
  }
}

export default forgetPasswordReducer;
