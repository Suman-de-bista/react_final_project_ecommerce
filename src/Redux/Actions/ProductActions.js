import axios from "axios";

import {
  FETCH_CATEGORY,
  FETCH_HOMEPAGE,
  FETCH_PRODUCTS,
} from "../ActionTypes/ActionTypes";

const BASE_URL = "https://uat.ordering-farmshop.ekbana.net";
var myHeaders = new Headers();
myHeaders.append("Warehouse-Id", "1");
myHeaders.append(
  "Api-Key",
  "3uxpudnPFywb4AYZjjpbhOHRV3YMTNscyRF4AiVZi2go6brJMx"
);
var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

export const fetchCategory = () => {
  return async (dispatch) => {
    await fetch(`${BASE_URL}/api/v4/category`, requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: FETCH_CATEGORY, payload: result.data })
      )
      .catch((error) => console.log("error", error));
  };
};

export const fetchHomePage = () => {
  return async (dispatch) => {
    await fetch(`${BASE_URL}/api/v4/home`, requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: FETCH_HOMEPAGE, payload: result.data })
      )
      .catch((error) => console.log("error", error));
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    await fetch(`${BASE_URL}/api/v4/product`, requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: FETCH_PRODUCTS, payload: result.data })
      )
      .catch((error) => console.log("error", error));
  };
};
