import { USER_LOGIN,USER_REGISTER,RESET_LOGIN_STORE, FETCH_PROFILE } from "../ActionTypes/ActionTypes";


const BASE_URL = "https://uat.ordering-farmshop.ekbana.net";
const access_token = localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem("loginDetail")).access_token
var myHeaders = new Headers();
myHeaders.append(
  "Api-Key",
  "3uxpudnPFywb4AYZjjpbhOHRV3YMTNscyRF4AiVZi2go6brJMx"
);

export const userRegister = (registerDetail) => {

var formdata = new FormData();
formdata.append("first_name", `${registerDetail.fname}`);
formdata.append("last_name", `${registerDetail.lname}`);
formdata.append("email", `${registerDetail.email}`);
formdata.append("password", `${registerDetail.password}`);
formdata.append("mobile_number", `${registerDetail.phnumber}`);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

return async(dispatch) =>{
  let response = await fetch(`${BASE_URL}/api/v4/auth/signup`, requestOptions);
  response = await response.json();
  dispatch({type:USER_REGISTER,payload:response})
}
};

export const userLogin = (loginDetail) => {
  
  var formdata = new FormData();
  formdata.append("client_id", "2");
  formdata.append("client_secret", "2TJrcyMbXT6gDQXVqeSlRbOKvtTfMsuxfuK6vpey");
  formdata.append("grant_type", "password");
  formdata.append("username", `${loginDetail.username}`);
  formdata.append("password", `${loginDetail.password}`);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  return async(dispatch) =>{
    let response = await fetch(`${BASE_URL}/api/v4/auth/login`, requestOptions);
    response = await response.json();
    dispatch({type:USER_LOGIN,payload:response})
    response.access_token && localStorage.setItem("loginDetail",JSON.stringify(response))
  }
};

export const fetchProfile = (dispatch) => {

  myHeaders.append("Authorization", `Bearer ${access_token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  

  return async(dispatch) =>{
    let response = await fetch(`${BASE_URL}/api/v4/profile`, requestOptions);
    response = await response.json();
    dispatch({type:FETCH_PROFILE,payload:response.data})
    response.data && localStorage.setItem("profile",JSON.stringify(response.data))
  }
};




export const resetLoginStore = () => {
  return (dispatch) =>{
    dispatch({type:RESET_LOGIN_STORE,payload:[]})
  }
}





