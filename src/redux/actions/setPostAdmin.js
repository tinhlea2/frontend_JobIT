import * as types from "../constants";
import store from "../store";
export function setPostAdmin(data) {
  store.dispatch({
    type: types.SET_POST_ADMIN,
    payload: data,
  });
}
