import * as types from "../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.ADD_MOD_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.ADD_MOD_API_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.ADD_MOD_API_FAILED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };

    default:
      return state;
  }
}
