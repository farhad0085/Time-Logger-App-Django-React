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
    profile: {
      address: "",
      phone: "",
      city: "",
      country: "",
      postal_code: "",
    },
  },
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
    default:
      return state;
  }
}

export default authReducer;
