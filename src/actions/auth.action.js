import { authConstants, cartConstants } from "./constants";
import axios from "../helpers/axios";

export const signup = (user) => {
  console.log("1", user);
  return async (dispatch) => {
    dispatch({ type: authConstants.SIGNUP_REQUEST });
    const res = await axios.post(`/signup`, {
      ...user,
    });
    console.log("SOME", res);
    if (res.status === 201) {
      console.log("SOME 1", res);
      const { message } = res.data;
      console.log("1 2", message);
      dispatch({
        type: authConstants.SIGNUP_SUCCESS,
        payload: {
          message,
        },
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      console.log("SOME 2", res);
      if (res.status === 400) {
        console.log("SOME 3", res);
        dispatch({
          type: authConstants.SIGNUP_FAILURE,
          payload: { error: res.data.error },
        });
      }
      dispatch({
        type: authConstants.SIGNUP_FAILURE,
        payload: { error: "Something Went Wrong!!!" },
      });
    }
  };
};

export const login = (user) => {
  console.log(user);
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post(`/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { message: "User needs to login" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    dispatch({ type: cartConstants.RESET_CART });
    //const res = await axios.post(`/admin/signout`);
    // if(res.status === 200){

    // }else{
    //     dispatch({
    //         type: authConstants.LOGOUT_FAILURE,
    //         payload: { error: res.data.error }
    //     });
    // }
  };
};
