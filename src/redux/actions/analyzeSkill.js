import { getAuth } from "../../utils/helpers";
import * as types from "../constants";
import store from "../store";
export function analyzeSkill(option, year, month, resolve = () => {}) {
  store.dispatch({
    type: types.ANALYZE_SKILL,
  });

  return fetch(
    `${process.env.REACT_APP_API_URL}/analysis/skill?option=${option}&year=${year}&month=${month}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getAuth().token,
      },
      // body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.ANALYZE_SKILL_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.ANALYZE_SKILL_FAILED,
      });
    });
}
