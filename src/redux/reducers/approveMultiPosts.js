import * as types from "../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
};
export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.APPROVE_MULTI_POSTS_API:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.APPROVE_MULTI_POSTS_API_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.APPROVE_MULTI_POSTS_API_FAILED:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
