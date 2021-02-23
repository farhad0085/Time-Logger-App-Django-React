import axios from "../../utils/axios";
import { getHeaders } from "../../utils";
import * as Types from "../actions/actionTypes";

export const deleteUser = (userId) => (dispatch) => {};

export const loadUsers = () => (dispatch) => {
  dispatch({ type: Types.USERS_LOADING, payload: true });
  axios
    .get("/time/users", { headers: getHeaders() })
    .then((res) => {
      console.log(res.data);
      dispatch({ type: Types.USERS_LOADED, payload: res.data });
      dispatch({ type: Types.USERS_LOADING, payload: false });
    })
    .catch((error) => {
      console.log(error.response);
      dispatch({ type: Types.USERS_LOADING, payload: false });
    });
};
