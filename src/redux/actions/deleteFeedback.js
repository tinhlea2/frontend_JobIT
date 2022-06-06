import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function deleteFeedback(id, resolve = () => {}) {
  store.dispatch({
    type: types.DELETE_FEEDBACK,
  });

  return fetch(`${process.env.REACT_APP_API_URL}/feedbacks/${id}`, {
    method: "DELETE",
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
        type: types.DELETE_FEEDBACK_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.DELETE_FEEDBACK_FAILED,
      });
    });
}
