import * as types from "../constants";
import store from "../store";
export function changePassword(data, resolve = () => {}) {
  store.dispatch({
    type: types.RESET_PASSWORD,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/auth/change-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.RESET_PASSWORD_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.RESET_PASSWORD_FAILED,
      });
    });
}
