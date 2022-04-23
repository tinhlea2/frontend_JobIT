import * as types from "../constants";
import store from "../store";
export function setInfo(data) {
  store.dispatch({
    type: types.SET_INFO,
    payload: data,
  });
}
