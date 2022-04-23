import * as types from "../constants";
import store from "../store";
export function register(data, role, resolve = () => {}) {
  store.dispatch({
    type: types.REGISTER_API,
  });
  return fetch(
    `${process.env.REACT_APP_API_URL}/auth/register-${role}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data)
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.REGISTER_API_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.REGISTER_API_FAILED,
      });
    });
}
// export function updateRememberedPath(path) {
//   store.dispatch({
//     type: types.UPDATE_REMEMBERED_PATH,
//     payload: path,
//   });
// }
