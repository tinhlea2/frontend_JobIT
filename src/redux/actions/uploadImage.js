import * as types from "../constants";
import store from "../store";
export function uploadImage(object, data, resolve = () => {}) {
  store.dispatch({
    type: types.UPLOAD_IMAGE,
  });
  return fetch(
    ` https://api.cloudinary.com/v1_1/articlesgroup/image/upload?api_key=567228543314488&signature=${object.signature}&timestamp=${object.timestamp}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        // Accept: "multipart/form-data",
        // Authorization: "Bearer " + getAuth().token
      },
      // body: JSON.stringify(data)
      body: data,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
      store.dispatch({
        payload: data,
        type: types.UPLOAD_IMAGE_SUCCEED,
      });
    })
    .catch((error) => {
      store.dispatch({
        payload: error,
        type: types.UPLOAD_IMAGE_FAILED,
      });
    });
}
// export function updateRememberedPath(path) {
//   store.dispatch({
//     type: types.UPDATE_REMEMBERED_PATH,
//     payload: path,
//   });
// }
