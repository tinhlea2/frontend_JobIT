import React from "react";
import { Link } from "react-router-dom";
import { getAuth } from "src/utils/helpers";

import nodata from "../../assets/icons/emoji.svg";
const PageNotFound = () => {
  const link =
    getAuth().role === "admin" || getAuth().role === "moderator"
      ? "/dashboard"
      : "";
  return (
    <div id="wrapper" className="center-not-found">
      <div id="info">
        <img width="200" src={nodata} alt="" />
        <h3
          className="mb-4 mt-4"
          style={{ fontSize: "xxx-large", color: "#42445a" }}
        >
          This page could not be found!
        </h3>
        <Link
          className="mt-4 primary"
          to={link}
          style={{ fontSize: "x-large" }}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};
export default PageNotFound;
