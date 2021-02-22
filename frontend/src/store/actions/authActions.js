import { getHeaders } from "../../utils";
import axios from "../../utils/axios";
import * as Types from "./actionTypes";


export const login = (loginCreds, history) => (dispatch) => {
  dispatch({ type: Types.AUTH_LOADING, payload: true });
  dispatch({ type: Types.USER_LOGIN_ERROR, payload: {} });
  axios
    .post("/auth/login/", loginCreds)
    .then((res) => {
        console.log(res.data);
        localStorage.setItem("timeLoggerUserToken", res.data.token);
      dispatch({ type: Types.USER_LOGGED_IN });
      history.push("/");
      dispatch(loadUserInfo());
    })
    .catch((error) => {
      dispatch({
        type: Types.USER_LOGIN_ERROR,
        payload: error.response ? error.response.data : {},
      });
      dispatch({ type: Types.AUTH_LOADING, payload: false });
    });
};

export const register = (registerData, history) => (dispatch) => {
  dispatch({ type: Types.AUTH_LOADING, payload: true });
  dispatch({ type: Types.USER_REGISTER_ERROR, payload: {} });
  axios
    .post("/auth/register/", registerData)
    .then((res) => {
      localStorage.setItem("timeLoggerUserToken", res.data.key);
      dispatch({ type: Types.AUTH_LOADING, payload: false });
      dispatch({ type: Types.USER_REGISTERED });
      history.push("/");
      dispatch(loadUserInfo());
    })
    .catch((error) => {
      dispatch({
        type: Types.USER_REGISTER_ERROR,
        payload: error.response ? error.response.data : {},
      });
      dispatch({ type: Types.AUTH_LOADING, payload: false });
    });
};

export const logout = (history) => (dispatch) => {
  dispatch({ type: Types.AUTH_LOADING, payload: true });
  localStorage.removeItem("timeLoggerUserToken");
  dispatch({ type: Types.USER_LOGGED_OUT });
  dispatch({ type: Types.AUTH_LOADING, payload: false });
  history.push("/");
};

export const loadUserInfo = () => (dispatch) => {
  dispatch({ type: Types.AUTH_LOADING, payload: true });

  axios
    .get("/auth/user/me/", { headers: getHeaders() })
    .then((res) => {
        console.log(res.data);
      dispatch({ type: Types.AUTH_LOADING, payload: false });
      dispatch({ type: Types.USER_LOGGED_IN, payload: res.data });
    })
    .catch((error) => {
      localStorage.removeItem("timeLoggerUserToken");
      dispatch({ type: Types.USER_LOGGED_OUT });
      dispatch({ type: Types.AUTH_LOADING, payload: false });
    });
};
