import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function createFeedback(data, resolve = () => {}) {
  store.dispatch({
    type: types.CREATE_FEEDBACK,
  });
}
