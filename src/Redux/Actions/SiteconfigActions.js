import { FETCH_SITE_CONFIGS } from "../ActionTypes/ActionTypes";

var myHeaders = new Headers();
myHeaders.append("Warehouse-Id", "1");
myHeaders.append("Api-Key", process.env.REACT_APP_API_KEY);
var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

export const fetchSiteConfig = () => {
  return async (dispatch) => {
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v4/config`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: FETCH_SITE_CONFIGS, payload: result.data })
      )
      .catch((error) => console.log("error", error));
  };
};
