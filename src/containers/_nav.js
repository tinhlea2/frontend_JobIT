const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["DASHBOARD"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Users Management",
    route: "/usersmanagement",
    icon: "cil-puzzle",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Moderator",
        to: "/usersmanagement/moderators",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Company",
        to: "/usersmanagement/companies",
      },
      {
        _tag: "CSidebarNavItem",
        name: "ITers",
        to: "/usersmanagement/ITers",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Users Statistic",
        to: "/usersmanagement/users-statistic",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Posts Management",
    route: "/postsmanagement",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Posts Approval",
        to: "/postsmanagement/posts-approval",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Posts Statistic",
        to: "/postsmanagement/posts-statistic",
      },
    ],
  },
];

export default _nav;
