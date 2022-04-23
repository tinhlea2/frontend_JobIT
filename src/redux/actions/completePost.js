import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function completePost(id, resolve = () => {}) {
  store.dispatch({
    type: types.COMPLETE_POST_API,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/posts/${id}/complete`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token,
        // "Access-Control-Allow-Origin": "*"
      },
      // body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.COMPLETE_POST_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.COMPLETE_POST_API_FAILED,
      });
    });
}
