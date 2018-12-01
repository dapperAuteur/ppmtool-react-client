import axios from "axios";
import { GET_ERRORS } from "./types";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    const res = await axios.post("/users/register", newUser);
    history.push("/login");
    console.log(res.data);
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
