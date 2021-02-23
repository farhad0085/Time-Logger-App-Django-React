import axios from "../../utils/axios";
import { getHeaders } from "../../utils";
import * as Types from "./actionTypes";

export const loadLogs = (filter) => (dispatch) => {
  dispatch({ type: Types.TIME_LOGS_LOADING, payload: true });

  if (filter) {
    axios
      .post("/time/logs/", filter, { headers: getHeaders() })
      .then((res) => {
        dispatch({ type: Types.TIME_LOGS_LOADED, payload: res.data });
        dispatch({ type: Types.TIME_LOGS_LOADING, payload: false });
      })
      .catch((error) => {
        console.log(error.response);
        dispatch({ type: Types.TIME_LOGS_LOADING, payload: false });
      });
  } else {
    axios
      .get("/time/logs/", { headers: getHeaders() })
      .then((res) => {
        dispatch({ type: Types.TIME_LOGS_LOADED, payload: res.data });
        dispatch({ type: Types.TIME_LOGS_LOADING, payload: false });
      })
      .catch((error) => {
        console.log(error.response);
        dispatch({
          type: Types.TIME_LOGS_LOAD_ERROR,
          payload: error.response
            ? error.response.data
            : { message: "Something went wrong" },
        });
        dispatch({ type: Types.TIME_LOGS_LOADING, payload: false });
      });
  }
};

export const createTimeLog = (data) => (dispatch) => {
  dispatch({ type: Types.TIME_LOGS_LOADING, payload: true });
  dispatch({ type: Types.TIME_LOG_SAVED, payload: false });
  dispatch({ type: Types.TIME_LOG_SAVE_ERROR, payload: {} });
  axios
    .post("/time/logs/create/", data, { headers: getHeaders() })
    .then((res) => {
      dispatch({ type: Types.TIME_LOGS_LOADING, payload: false });
      dispatch({ type: Types.TIME_LOG_SAVED, payload: true });
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response && error.response.data.duration) {
        dispatch({
          type: Types.TIME_LOG_SAVE_ERROR,
          payload: { message: "Duration must be less than or equal 24 hours" },
        });
      } else {
        dispatch({
          type: Types.TIME_LOG_SAVE_ERROR,
          payload: error.response
            ? error.response.data
            : { message: "Something went wrong" },
        });
      }
      dispatch({ type: Types.TIME_LOGS_LOADING, payload: false });
    });
};

export const deleteTimeLog = (logId) => (dispatch) => {
  dispatch({ type: Types.TIME_LOGS_LOADING, payload: true });
  axios
    .delete(`/time/logs/${logId}`, { headers: getHeaders() })
    .then((res) => {
      dispatch(loadLogs());
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const updateTimeLog = (logId, data) => (dispatch) => {
  dispatch({ type: Types.TIME_LOGS_LOADING, payload: true });
  dispatch({ type: Types.TIME_LOG_SAVED, payload: false });
  dispatch({ type: Types.TIME_LOG_SAVE_ERROR, payload: {} });
  axios
    .put(`/time/logs/${logId}/`, data, { headers: getHeaders() })
    .then((res) => {
      dispatch({ type: Types.TIME_LOGS_LOADING, payload: false });
      dispatch({ type: Types.TIME_LOG_SAVED, payload: true });
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response && error.response.data.duration) {
        dispatch({
          type: Types.TIME_LOG_SAVE_ERROR,
          payload: { message: "Duration must be less than or equal 24 hours" },
        });
      } else {
        dispatch({
          type: Types.TIME_LOG_SAVE_ERROR,
          payload: error.response
            ? error.response.data
            : { message: "Something went wrong" },
        });
      }
      dispatch({ type: Types.TIME_LOGS_LOADING, payload: false });
    });
};

export const loadSingleLog = (logId) => (dispatch) => {
  dispatch({ type: Types.TIME_LOG_LOADING, payload: true });
  axios
    .get(`/time/logs/${logId}`, { headers: getHeaders() })
    .then((res) => {
      //   console.log(res.data);
      dispatch({ type: Types.TIME_LOG_LOADED, payload: res.data });
      dispatch({ type: Types.TIME_LOG_LOADING, payload: false });
    })
    .catch((error) => {
      //   console.log(error.response);
      dispatch({
        type: Types.TIME_LOG_LOAD_ERROR,
        payload: error.response
          ? error.response.data
          : { detail: "Something went wrong" },
      });
      dispatch({ type: Types.TIME_LOG_LOADING, payload: false });
    });
};
