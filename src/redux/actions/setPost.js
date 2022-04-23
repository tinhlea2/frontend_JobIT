import * as types from "../constants";
import store from "../store";
export function setPost(data) {
  store.dispatch({
    type: types.SET_POST,
    payload: data,
  });
}
