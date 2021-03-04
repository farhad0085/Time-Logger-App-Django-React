import axios from "../../utils/axios";
import { getHeaders } from "../../utils";
import * as Types from "../actions/actionTypes";

export const deleteUser = (userId) => (dispatch) => {
  dispatch({ type: Types.USERS_LOADING, payload: true });
  axios
    .delete(`/auth/user/${userId}/`, { headers: getHeaders() })
    .then((res) => {
      dispatch(loadUsers())
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const loadUsers = () => (dispatch) => {
  dispatch({ type: Types.USERS_LOADING, payload: true });
  axios
    .get("/time/users", { headers: getHeaders() })
    .then((res) => {
      dispatch({ type: Types.USERS_LOADED, payload: res.data });
      dispatch({ type: Types.USERS_LOADING, payload: false });
    })
    .catch((error) => {
      dispatch({ type: Types.USERS_LOADING, payload: false });
    });
};
