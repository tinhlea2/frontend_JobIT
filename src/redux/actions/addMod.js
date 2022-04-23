import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function addMod(data, resolve = () => {}) {
  store.dispatch({
    type: types.ADD_MOD_API,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/moderators`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token
      },
      body: JSON.stringify(data)
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.ADD_MOD_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.ADD_MOD_API_FAILED,
      });
    });
}
