import axios from "../../utils/axios";
import * as Types from "./actionTypes";


export const requestResetPassword = (email) => (dispatch) => {
  dispatch({ type: Types.FORGET_PASSWORD_REQUEST_RESET_LOADING, payload: true });
  dispatch({ type: Types.FORGET_PASSWORD_REQUEST_RESET_ERROR, payload: "" });
  axios.post("auth/password/reset/", {email})
    .then((res) => {
      dispatch({ type: Types.FORGET_PASSWORD_REQUEST_RESET_LOADING, payload: false });
      dispatch({ type: Types.FORGET_PASSWORD_REQUEST_RESET_SUCCESS });
    })
    .catch((error) => {
      dispatch({ type: Types.FORGET_PASSWORD_REQUEST_RESET_ERROR, payload: "No Account found for that email address." });
      dispatch({ type: Types.FORGET_PASSWORD_REQUEST_RESET_LOADING, payload: false });
    });
};


export const resetPassword = (data) => dispatch => {
    dispatch({type: Types.FORGET_PASSWORD_RESET_LOADING, payload: true})
    dispatch({type: Types.FORGET_PASSWORD_RESET_ERROR, payload: {}})

    axios.post("/auth/password/reset/confirm/", data)
    .then(res => {
        dispatch({type: Types.FORGET_PASSWORD_RESET_LOADING, payload: false})
        dispatch({type: Types.FORGET_PASSWORD_RESET_SUCCESS})
    })
    .catch(error => {
        dispatch({type: Types.FORGET_PASSWORD_RESET_LOADING, payload: false})
        dispatch({type: Types.FORGET_PASSWORD_RESET_ERROR, payload: error.response.data})
    })
}