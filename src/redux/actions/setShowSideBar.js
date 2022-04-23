import * as types from "../constants";
import store from "../store";
export function setShowSidebar(status) {
  store.dispatch({
    type: types.SET_SHOW_SIDEBAR,
    payload: status
  });
}
