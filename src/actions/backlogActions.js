import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASKS } from "./types";

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
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getBacklog = backlog_id => async dispatch => {
  try {
    const res = await axios.get(`/backlogs/${backlog_id}`);
    console.log(res.data);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.data);
    console.log(err.response);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
