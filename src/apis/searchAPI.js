import axios from "axios";

import { alertConstants, searchConstants } from "../constants/";

const PARAMS = ({ methodType = "GET" }) => ({
  method: methodType,
  headers: {
    "Content-Type": "application/json"
  }
});

export const userLogin = axios.create(
  {
    baseURL: alertConstants.LOGINBASEURL
  },
  Object.assign({}, PARAMS({ methodType: "POST" }))
);

export const searchPlanets = axios.create(
  {
    baseURL: searchConstants.SEARCHBASEURL
  },
  Object.assign({}, PARAMS({ methodType: "POST" }))
);
