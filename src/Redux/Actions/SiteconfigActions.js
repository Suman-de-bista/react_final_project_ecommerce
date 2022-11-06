import axios from "axios";

import {
  FETCH_SITE_CONFIGS
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

export const fetchSiteConfig = () => {
  return async (dispatch) => {
    await fetch(`${BASE_URL}/api/v4/config`, requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: FETCH_SITE_CONFIGS, payload: result.data })
      )
      .catch((error) => console.log("error", error));
  };
};

