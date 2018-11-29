import axios from "axios";
// import {}

export const addProjectTask = (
  backlog_id,
  project_task,
  history
) => async dispatch => {
  await axios.post(`/backlogs/${backlog_id}`, project_task);
  history.push(`/projectBoard/${backlog_id}`);
};
