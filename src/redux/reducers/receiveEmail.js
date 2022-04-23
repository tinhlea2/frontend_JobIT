import * as types from "../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.RECEIVE_EMAIL:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.RECEIVE_EMAIL_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.RECEIVE_EMAIL_FAILED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
