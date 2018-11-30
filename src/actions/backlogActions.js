import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG,
  GET_PROJECT_TASK,
  UPDATE_PROJECT_TASK
} from "./types";

export const addProjectTask = (
  backlog_id,
  project_task,
  history
) => async dispatch => {
  try {
    await axios.post(`/backlogs/${backlog_id}`, project_task);
    history.push(`/projectBoard/${backlog_id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push(`/projectBoard/${backlog_id}`);
  } catch (err) {
    // console.log(err.response.data);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    history.push(`/projectBoard/${backlog_id}`);
  }
};

export const getBacklog = backlog_id => async dispatch => {
  try {
    const res = await axios.get(`/backlogs/${backlog_id}`);
    // console.log(res.data);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  } catch (err) {
    // console.log(err.response.data);
    // console.log(err.response);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getProjectTask = (
  backlog_id,
  pt_id,
  history
) => async dispatch => {
  try {
    const res = await axios.get(`/backlogs/${backlog_id}/${pt_id}`);
    console.log(res.data);
    dispatch({
      type: GET_PROJECT_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    history.push(`/projectBoard/${backlog_id}`);
  }
};

export const updateProjectTask = (
  backlog_id,
  pt_id,
  history
) => async dispatch => {
  try {
    console.log(backlog_id, pt_id, history);
    const res = await axios.patch(`/backlogs/${backlog_id}/${pt_id}`);
    console.log(res.data);
    dispatch({
      type: UPDATE_PROJECT_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    history.push(`/projectBoard/${backlog_id}`);
  }
};
