import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function getCV(id, resolve = () => {}) {
  store.dispatch({
    type: types.GET_CV,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/cv/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token,
        // "Access-Control-Allow-Origin": "*"
      },
    //  body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.GET_CV_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.GET_CV_FAILED,
      });
    });
}
