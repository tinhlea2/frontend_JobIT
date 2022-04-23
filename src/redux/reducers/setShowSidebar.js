import * as types from "../constants";

const initialState = {
 status: true
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_SHOW_SIDEBAR:
      return {
        ...state,
       status: actions.payload
      };
    default:
      return state;
  }
}
