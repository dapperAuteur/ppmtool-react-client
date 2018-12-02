import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "./../secureUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    const res = await axios.post("/api/ver0001/users/register", newUser);
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

export const login = loginRequest => async dispatch => {
  try {
    //  post => Login Request
    const res = await axios.post("/api/ver0001/users/login", loginRequest);
    // extract token from res.data
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in header ***
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispacth to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
