import {
  FETCH_CATEGORY,
  FETCH_HOMEPAGE,
  FETCH_PRODUCTS,
} from "../ActionTypes/ActionTypes";

var myHeaders = new Headers();
myHeaders.append("Warehouse-Id", "1");
myHeaders.append("Api-Key", process.env.REACT_APP_API_KEY);
var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

export const fetchCategory = () => {
  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/v4/category`, requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: FETCH_CATEGORY, payload: result.data })
      )
      .catch((error) => console.log("error", error));
  };
};

export const fetchHomePage = () => {
  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/v4/home`, requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: FETCH_HOMEPAGE, payload: result.data })
      )
      .catch((error) => console.log("error", error));
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/v4/product`, requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: FETCH_PRODUCTS, payload: result.data })
      )
      .catch((error) => console.log("error", error));
  };
};
