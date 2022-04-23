import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function approveMultiPosts(data, resolve = () => {}) {
  store.dispatch({
    type: types.APPROVE_MULTI_POSTS_API,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/posts/accept-many`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token,
        // "Access-Control-Allow-Origin": "*"
      },
       body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.APPROVE_MULTI_POSTS_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.APPROVE_MULTI_POSTS_API_FAILED,
      });
    });
}
