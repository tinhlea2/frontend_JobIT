import * as types from "../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
  rememberPath: "",
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.ANALYZE_USER:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.ANALYZE_USER_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.ANALYZE_USER_FAILED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
