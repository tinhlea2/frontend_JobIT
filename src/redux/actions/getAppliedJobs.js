import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function getAppliedJobs(resolve = () => {}) {
  store.dispatch({
    type: types.GET_APPLIED_JOBS_API,
  });
  return fetch(`${process.env.REACT_APP_API_URL}/posts/applied`, {
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
        type: types.GET_APPLIED_JOBS_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.GET_APPLIED_JOBS_API_FAILED,
      });
    });
}
