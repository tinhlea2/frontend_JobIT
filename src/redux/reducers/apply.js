import * as types from "../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
  rememberPath: "",
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.APPLY_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.APPLY_API_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.APPLY_API_FAILED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
