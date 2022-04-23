import { getAuth } from "src/utils/helpers";
import * as types from "../constants";

const initialState = {
  data: {
    name: getAuth().name || "",
    image: getAuth().image || "",
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_INFO:
      return {
        ...state,
        data: actions.payload,
      };
    default:
      return state;
  }
}
