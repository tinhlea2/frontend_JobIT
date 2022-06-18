import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function response(postId, data, resolve = () => {}) {
  store.dispatch({
    type: types.RESPONSE_API,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/posts/${postId}/response-apply`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token,
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.RESPONSE_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.RESPONSE_API_FAILED,
      });
    });
}
