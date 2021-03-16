import * as Types from "../actions/actionTypes";

const initialState = {
  isAuthenticated: !!localStorage.getItem("timeLoggerUserToken"),
  loginErrors: {},
  registerErrors: {},
  loading: false,
  user: {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    city: "",
    country: "",
    postal_code: "",
    company: ""
  },
  company: {
    loading: false,
    data: [],
    error: ""
  }
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case Types.USER_LOGGED_IN: {
      return {
        ...state,
        isAuthenticated: true,
        loginErrors: {},
        user: action.payload ? action.payload : { ...state.user },
      };
    }
    case Types.USER_LOGIN_ERROR: {
      return {
        ...state,
        loginErrors: action.payload,
      };
    }
    case Types.USER_REGISTERED: {
      return {
        ...state,
        isAuthenticated: true,
        registerErrors: {},
      };
    }
    case Types.USER_REGISTER_ERROR: {
      return {
        ...state,
        registerErrors: action.payload,
      };
    }
    case Types.AUTH_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case Types.USER_LOGGED_OUT: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case Types.COMPANY_DATA_LOADING: {
      return {
        ...state,
        company: {
          ...state.company,
          loading: action.payload
        }
      }
    }
    case Types.COMPANY_DATA_LOADED: {
      return {
        ...state,
        company: {
          data: action.payload,
          loading: false,
          error: ""
        }
      }
    }
    case Types.COMPANY_DATA_LOAD_ERROR: {
      return {
        ...state,
        company: {
          data: [],
          loading: false,
          error: action.payload
        }
      }
    }
    default:
      return state;
  }
}

export default authReducer;
