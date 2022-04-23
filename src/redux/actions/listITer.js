import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function listITer(newPage, resolve = () => {}) {
  store.dispatch({
    type: types.ADMIN_GET_LIST_ITER,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/iters?page=${newPage}`,
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
        type: types.ADMIN_GET_LIST_ITER_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.ADMIN_GET_LIST_ITER_FAILED,
      });
    });
}
