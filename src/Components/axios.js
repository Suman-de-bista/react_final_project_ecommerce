import axios from "axios";

export const axiosData = axios.create({
  baseURL: "https://uat.ordering-farmshop.ekbana.net",
  headers: {
    "Api-key": process.env.REACT_APP_API_KEY,
    "Warehouse-Id": 1,
    "Content-Type": "application/json",
  },
});
