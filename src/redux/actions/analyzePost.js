import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function analyzePost(year, resolve = () => {}) {
  store.dispatch({
    type: types.ANALYZE_POST,
  });

  return fetch(`${process.env.REACT_APP_API_URL}/analysis/post?year=${year}`, {
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
        type: types.ANALYZE_POST_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.ANALYZE_POST_FAILED,
      });
    });
}
