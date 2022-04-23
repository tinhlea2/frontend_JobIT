import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function getUnacceptedPosts(newPage, resolve = () => {}) {
  store.dispatch({
    type: types.GET_UNACCEPTED_POST,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/posts/need-accept?page=${newPage}`,
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
        type: types.GET_UNACCEPTED_POST_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.GET_UNACCEPTED_POST_FAILED,
      });
    });
}
