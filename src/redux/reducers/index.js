import { combineReducers } from "redux";
import loginAdmin from "./loginAdmin";
import listModerator from "./listModerator";
import listCompany from "./listCompany";
import listITer from "./listITer";
import addMod from "./addMod";
import deleteMod from "./deleteMod";
import deleteCompany from "./deleteCompany";
import deleteITer from "./deleteITer";
import listUserPermissions from "./listUserPermissions";
import getRolePermissions from "./getRolePermissions";
import updateRolePermissions from "./updateRolePermissions";
import getPosts from "./getPosts";
import getUnacceptedPosts from "./getUnacceptedPosts";
import deletePost from "./deletePost";
import approvePost from "./approvePost";
import approveMultiPosts from "./approveMultiPosts";

import updateUserPermissions from "./updateUserPermissions";

import login from "./login";
import register from "./register";
import resetPassword from "./resetPassword";
import confirmCode from "./confirmCode";
import changePassword from "./changePassword";
import apply from "./apply";
import getPostsComp from "./getPostsComp";
import getAppliers from "./getAppliers";
import addPost from "./addPost";
import getProfile from "./getProfile";
import updateProfile from "./updateProfile";
import getCV from "./getCV";
import getITerCV from "./getITerCV";
import setShowSidebar from "./setShowSidebar";
import createCV from "./createCV";
import getSignature from "./getSignature";
import uploadImage from "./uploadImage";
import updateCV from "./updateCV";
import createFeedback from "./createFeedback";
import deleteFeedback from "./deleteFeedback";
import getFeedback from "./getFeedback";
import getCompany from "./getCompany";
import getPostList from "./getPostList";
import setInfo from "./setInfo";
import analyzePost from "./analyzePost";
import analyzeSkill from "./analyzeSkill";
import analyzeUser from "./analyzeUser";
import setPost from "./setPost";
import setPostAdmin from "./setPostAdmin";
import receiveEmail from "./receiveEmail";
import updatePass from "./updatePass";
import updatePost from "./updatePost";
import completePost from "./completePost";

export default combineReducers({
  loginAdmin,
  listModerator,
  listCompany,
  listITer,
  addMod,
  deleteMod,
  deleteCompany,
  deleteITer,
  listUserPermissions,
  getRolePermissions,
  updateRolePermissions,
  getPosts,
  getUnacceptedPosts,
  deletePost,
  approvePost,
  approveMultiPosts,

  updateUserPermissions,

  login,
  setShowSidebar,
  register,
  resetPassword,
  confirmCode,
  changePassword,
  apply,
  getPostsComp,
  getAppliers,
  addPost,
  getProfile,
  updateProfile,
  getCV,
  getITerCV,
  createCV,
  getSignature,
  uploadImage,
  updateCV,
  createFeedback,
  deleteFeedback,
  getFeedback,
  getCompany,
  getPostList,
  setInfo,
  analyzePost,
  analyzeSkill,
  analyzeUser,
  setPostAdmin,
  setPost,
  receiveEmail,
  updatePass,
  updatePost,
  completePost,
});
