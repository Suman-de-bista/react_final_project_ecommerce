import axios from "axios";
import Swal from "sweetalert2";
import {
  USER_LOGIN,
  USER_REGISTER,
  RESET_LOGIN_STORE,
  FETCH_PROFILE,
} from "../ActionTypes/ActionTypes";

const access_token =
  localStorage.getItem("loginDetail") &&
  JSON.parse(localStorage.getItem("loginDetail")).access_token;
var myHeaders = new Headers();
myHeaders.append("Api-Key", `${process.env.REACT_APP_API_KEY}`);

export const userRegister = (registerDetail) => {
  var data = new FormData();
  data.append("first_name", `${registerDetail.firstName}`);
  data.append("last_name", `${registerDetail.lastName}`);
  data.append("email", `${registerDetail.email}`);
  data.append("password", `${registerDetail.password}`);
  data.append("mobile_number", `${registerDetail.phNumber}`);

  var config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/api/v4/auth/signup`,
    headers: myHeaders,
    data: data,
  };

  return async (dispatch) => {
    await axios(config)
      .then((response) => {
        dispatch({ type: USER_REGISTER, payload: response.data });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oops...",
          text: error.response.data.errors[0].message,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
};

export const userLogin = (loginDetail) => {
  var data = new FormData();
  data.append("client_id", "2");
  data.append("client_secret", "2TJrcyMbXT6gDQXVqeSlRbOKvtTfMsuxfuK6vpey");
  data.append("grant_type", "password");
  data.append("username", `${loginDetail.username}`);
  data.append("password", `${loginDetail.password}`);

  var config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/api/v4/auth/login`,
    headers: myHeaders,
    data: data,
  };

  return async (dispatch) => {
    await axios(config)
      .then((response) => {
        dispatch({ type: USER_LOGIN, payload: response.data });
        response.data.access_token &&
          localStorage.setItem("loginDetail", JSON.stringify(response.data));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Success`,
          text: "Successfully LoggedIn",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Oops...",
          text: error.response.data.errors[0].message,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
};

export const fetchProfile = (dispatch) => {
  myHeaders.append("Authorization", `Bearer ${access_token}`);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return async (dispatch) => {
    let response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v4/profile/show`,
      requestOptions
    );
    response = await response.json();
    dispatch({ type: FETCH_PROFILE, payload: response.data });
    response.data &&
      localStorage.setItem("profile", JSON.stringify(response.data));
  };
};

export const updateProfile = (updateDetail) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${access_token}`);
  myHeaders.append("Api-Key", `${process.env.REACT_APP_API_KEY}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "first-name": `${updateDetail.firstName}`,
    "last-name": `${updateDetail.lastName}`,
    "mobile-number": `${updateDetail.phNumber}`,
  });

  var requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return async (dispatch) => {
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v4/profile`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(fetchProfile());
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };
};

export const resetLoginStore = () => {
  return (dispatch) => {
    dispatch({ type: RESET_LOGIN_STORE, payload: [] });
  };
};
