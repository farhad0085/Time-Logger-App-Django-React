import axios from "../../utils/axios";
import { getHeaders } from "../../utils";
import * as Types from "./actionTypes";

export const loadUserProfileInformation = (userId) => (dispatch) => {
//   console.log(userId);
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

export const updateProfile = (data) => (dispatch) => {
  console.log(data);
};
