import * as types from "../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.ADMIN_GET_LIST_ITER:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.ADMIN_GET_LIST_ITER_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.ADMIN_GET_LIST_ITER_FAILED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
