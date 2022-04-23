import Dashboard from "./components/dashboard/Dashboard";

import Moderators from "./components/usersmanagement/moderators/Moderators";
import UserPermissions from "./components/usersmanagement/UserPermissions";

import Companies from "./components/usersmanagement/companies/Companies";
import ITers from "./components/usersmanagement/ITers/ITers";

import PostsStatistic from "./components/postsmanagement/posts-statistic/PostsStatistic";

import GroupPermissions from "./containers/admin/GroupPermissions";
import PostManagement from "./containers/admin/PostManagement";
import PostComp from "./components/comp/PostComp";
import Applier from "./components/comp/Applier";
import ITerProfile from "./components/iter/ITerProfile";
import Feedbacks from "./containers/admin/Feedbacks";
import Company from "./components/comp/Company";
import DetailPost from "./components/common/DetailPost";
import UsersStatistic from "./components/usersmanagement/UsersStatistic";

const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  {
    path: "/usersmanagement",
    name: "Users Management",
    component: GroupPermissions,
    exact: true,
  },
  {
    path: "/usersmanagement/:role/:id/:name",
    name: "Users Permissions",
    component: UserPermissions,
    exact: true,
  },

  {
    path: "/usersmanagement/moderators",
    name: "Moderators",
    component: Moderators,
    exact: true,
  },
  {
    path: "/usersmanagement/companies",
    name: "Companies",
    component: Companies,
  },
  { path: "/usersmanagement/ITers", name: "ITers", component: ITers },
  {
    path: "/usersmanagement/users-statistic",
    name: "Users Statistic",
    component: UsersStatistic,
  },

  {
    path: "/postsmanagement",
    name: "Posts Management",
    component: PostManagement,
    exact: true,
  },
  {
    path: "/postsmanagement/posts-approval",
    name: "Posts Approval",
    component: PostManagement,
  },
  {
    path: "/postsmanagement/posts-statistic",
    name: "Posts Statistic",
    component: PostsStatistic,
  },

  {
    path: "/grouppermissions",
    exact: true,
    name: "Group permissions",
    component: GroupPermissions,
  },

  { path: "/feedbacks", exact: true, name: "Feedbacks", component: Feedbacks },

  // comp
  { path: "/post-management", component: PostComp, exact: true },
  { path: "/post/appliers/:id", component: Applier, exact: true },
  { path: "/posts/company/:companyId", component: Company, exact: true },
  { path: "/posts/:id", component: DetailPost, exact: true },

  { path: "/profile", component: ITerProfile, exact: true },
];

export default routes;
