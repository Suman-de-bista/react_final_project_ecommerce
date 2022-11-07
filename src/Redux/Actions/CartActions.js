import axios from "axios";
import { ADD_TO_CART, FETCH_CART } from "../ActionTypes/ActionTypes";

const BASE_URL = "https://uat.ordering-farmshop.ekbana.net";
const access_token = localStorage.getItem('loginDetail') && JSON.parse(localStorage.getItem("loginDetail")).access_token

console.log(access_token);
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${access_token}`);
myHeaders.append("Warehouse-Id", "1");
myHeaders.append(
  "Api-Key",
  "3uxpudnPFywb4AYZjjpbhOHRV3YMTNscyRF4AiVZi2go6brJMx"
);
myHeaders.append("Access-Control-Allow-Origin", "*")

export const addTocart = (product) => {
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    productId: product.id,
    priceId: product.unitPrice[0].id,
    quantity: `${product.quantity}`,
    note: "cart",
  });

  var config = {
    method: 'post',
    url: 'https://uat.ordering-farmshop.ekbana.net/api/v4/cart-product',
    headers: { 
      'Authorization': `Bearer ${access_token}`, 
      'Warehouse-Id': '1', 
      'Api-Key': '3uxpudnPFywb4AYZjjpbhOHRV3YMTNscyRF4AiVZi2go6brJMx', 
      'Content-Type': 'application/json'
    },
    data : raw
  };
  return async (dispatch) => {
    await axios(config)
      .then((response) => dispatch({type:ADD_TO_CART,payload:response.data.data}))
      // .then((result) => dispatch({type:ADD_TO_CART,payload:result.data}))
      .catch((error) => console.log("error", error));
  };
};

export const fetchCart = () => {
  var data = '';
  var config = {
    method: 'get',
    url: 'https://uat.ordering-farmshop.ekbana.net/api/v4/cart',
    headers: { 
      'Authorization': `Bearer ${access_token}`, 
      'Warehouse-Id': '1', 
      'Api-Key': process.env.REACT_APP_API_KEY
    },
    data : data
  };

  return async (dispatch) => {
    await axios(config)
      .then((response) => dispatch({ type: FETCH_CART, payload: response.data.data }))
      .catch((error) => console.log("error", error));
  };
};



