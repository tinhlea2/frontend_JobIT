import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function createCV(data, resolve = () => {}) {
  store.dispatch({
    type: types.CREATE_CV,
  });
  return fetch(`${process.env.REACT_APP_API_URL}/cv`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getAuth().token,
      // "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.CREATE_CV_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.CREATE_CV_FAILED,
      });
    });
}
