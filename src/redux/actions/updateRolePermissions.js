import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function updateRolePermissions(data, resolve = () => {}) {
  store.dispatch({
    type: types.UPDATE_ROLE_PERMISSIONS_API,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/permissions`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.UPDATE_ROLE_PERMISSIONS_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.UPDATE_ROLE_PERMISSIONS_API_FAILED,
      });
    });
}
