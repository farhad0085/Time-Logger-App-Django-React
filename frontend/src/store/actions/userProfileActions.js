import axios from "../../utils/axios";
import { getHeaders } from "../../utils";
import * as Types from "./actionTypes";
import { loadUserInfo } from "./authActions";

export const loadUserProfileInformation = (userId) => (dispatch) => {
  axios
    .get(`/auth/user/${userId}/`, { headers: getHeaders() })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Types.USER_PROFILE_INFORMATION_LOADED,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: Types.USER_PROFILE_INFORMATION_LOAD_ERROR,
        payload: false,
      });
    });
};

export const updateProfile = (userId, profileData) => (dispatch) => {
  dispatch({ type: Types.USER_PROFILE_LOADING, payload: true });
  dispatch({ type: Types.USER_PROFILE_UPDATE_ERROR, payload: {} });
  axios
    .put(`/auth/user/${userId}/`, profileData, { headers: getHeaders() })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: Types.USER_PROFILE_UPDATED, payload: res.data });
      dispatch({ type: Types.USER_PROFILE_LOADING, payload: false });
      dispatch(loadUserInfo())
    })
    .catch((error) => {
      dispatch({
        type: Types.USER_PROFILE_UPDATE_ERROR,
        payload: error.response.data,
      });
      dispatch({ type: Types.USER_PROFILE_LOADING, payload: false });
    });
};

export const updatePassword = (data) => (dispatch) => {
  dispatch({ type: Types.USER_PROFILE_LOADING, payload: true });
  dispatch({ type: Types.USER_PASSWORD_UPDATE_ERROR, payload: {} });
  axios
    .post("/auth/password/change/", data, { headers: getHeaders() })
    .then((res) => {
      dispatch({ type: Types.USER_PASSWORD_UPDATED });
      dispatch({ type: Types.USER_PROFILE_LOADING, payload: false });
    })
    .catch((error) => {
      dispatch({ type: Types.USER_PROFILE_LOADING, payload: false });
      dispatch({
        type: Types.USER_PASSWORD_UPDATE_ERROR,
        payload: error.response.data,
      });
    });
};
