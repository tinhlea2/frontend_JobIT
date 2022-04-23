import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function receiveEmail (data, resolve = () => {}) {
  store.dispatch({
    type: types.RECEIVE_EMAIL,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/iters/receive-mail`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token
        // "Access-Control-Allow-Origin": "*"
      },
     body: JSON.stringify(data)
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.RECEIVE_EMAIL_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.RECEIVE_EMAIL_FAILED,
      });
    });
}
