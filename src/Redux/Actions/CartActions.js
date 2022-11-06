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

export const addTocart = (product) => {
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    productId: product.id,
    priceId: product.unitPrice[0].id,
    quantity: product.quantity,
    note: "cart",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return async (dispatch) => {
    await fetch(`${BASE_URL}/api/v4/cart-product`, requestOptions)
      .then((response) => response.json())
      .then((result) => dispatch({type:ADD_TO_CART,payload:result.data}))
      .catch((error) => console.log("error", error));
  };
};

export const fetchCart = () => {

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return async (dispatch) => {
    await fetch(`${BASE_URL}/api/v4/cart`, requestOptions)
      .then((response) => response.json())
      .then((result) => dispatch({ type: FETCH_CART, payload: result.data }))
      .catch((error) => console.log("error", error));
  };
};



