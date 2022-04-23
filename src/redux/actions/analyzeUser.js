import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function analyzeUser(resolve = () => {}) {
  store.dispatch({
    type: types.ANALYZE_USER,
  });
  return fetch(`${process.env.REACT_APP_API_URL}/analysis/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getAuth().token,
    },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.ANALYZE_USER_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.ANALYZE_USER_FAILED,
      });
    });
}
