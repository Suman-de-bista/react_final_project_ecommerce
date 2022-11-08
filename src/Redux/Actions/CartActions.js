import axios from "axios";
import Swal from "sweetalert2";
import { ADD_TO_CART, FETCH_CART } from "../ActionTypes/ActionTypes";

const access_token =
  localStorage.getItem("loginDetail") &&
  JSON.parse(localStorage.getItem("loginDetail")).access_token;

console.log(access_token);
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${access_token}`);
myHeaders.append("Warehouse-Id", "1");
myHeaders.append("Api-Key", process.env.REACT_APP_API_KEY);

export const addTocart = (product) => {
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    productId: product.id,
    priceId: product.unitPrice[0].id,
    quantity: `${product.quantity}`,
    note: "cart",
  });

  var config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/api/v4/cart-product`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Warehouse-Id": "1",
      "Api-Key": process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    },
    data: raw,
  };
  return async (dispatch) => {
    await axios(config)
      .then((response) => {
        dispatch({ type: ADD_TO_CART, payload: response.data.data });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Success`,
          text: "Item added to the Cart successfully.",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => console.log("error", error));
  };
};

export const fetchCart = () => {
  var data = "";
  var config = {
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL}/api/v4/cart`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Warehouse-Id": "1",
      "Api-Key": process.env.REACT_APP_API_KEY,
    },
    data: data,
  };

  return async (dispatch) => {
    await axios(config)
      .then((response) =>
        dispatch({ type: FETCH_CART, payload: response.data.data })
      )
      .catch((error) => console.log("error", error));
  };
};
export const deleteCart = (cartId) => {
  var data = "";

  var config = {
    method: "delete",
    url: `${process.env.REACT_APP_BASE_URL}/api/v4/cart-product/${cartId}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Warehouse-Id": "1",
      "Api-Key": process.env.REACT_APP_API_KEY,
    },
    data: data,
  };

  return async (dispatch) => {
    axios(config)
      .then((response) => {
        dispatch(fetchCart());
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Success`,
          text: "Item Successfully Deleted",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const patchCart = (productId, productQuantity) => {
  var data = JSON.stringify({
    quantity: productQuantity,
    note: "Patched",
  });

  var config = {
    method: "patch",
    url: `${process.env.REACT_APP_BASE_URL}/api/v4/cart-product/${productId}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Warehouse-Id": "1",
      "Api-Key": process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return async (dispatch) => {
    axios(config)
      .then((response) => {
        dispatch(fetchCart());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
