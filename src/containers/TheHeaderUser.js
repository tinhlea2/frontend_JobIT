import React from "react";
import {
  CHeader,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CButton,
  CLink,
} from "@coreui/react";
import { Link } from "react-router-dom";
import { getAuth } from "src/utils/helpers";
import logo from "../assets/images/logo.png";
// routes config

import { TheHeaderDropdown } from "./index";
import { useSelector } from "react-redux";
const TheHeaderUser = () => {
  const storeSetInfo = useSelector((store) => store.setInfo);

  return getAuth().token && getAuth().role === "company" ? (
    <CHeader className="header">
      <CHeaderNav className="d-md-down-none mr-auto header__inner">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/">
            <img src={logo} alt="" width="100px"></img>
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="header__inner__menu">
          <CLink activeClassName="--active" to="/post-management">
            Hiring Posts
          </CLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="header__inner__menu">
          <CLink
            activeClassName="--active"
            className="header__inner__menu__middle"
            to="/it-companies"
          >
            Companies
          </CLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="header__inner__menu">
          <CLink activeClassName="--active" to="/about-us">
            About our team
          </CLink>
        </CHeaderNavItem>
      </CHeaderNav>
      {getAuth().role ? (
        <CHeaderNav className="px-3">
          <p>{getAuth().name}</p>
          <TheHeaderDropdown />
        </CHeaderNav>
      ) : (
        <CHeaderNav className="px-3">
          <Link to="/login">
            <CButton className="px-4 btn--primary">Login</CButton>
          </Link>
        </CHeaderNav>
      )}
    </CHeader>
  ) : (
    <CHeader className="header">
      <CHeaderNav className="d-md-down-none mr-auto header__inner">
        <CHeaderNavItem>
          <CHeaderNavLink to="/">
            <img src={logo} alt="" width="100px"></img>
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="header__inner__menu">
          <CLink activeClassName="--active" exact to="/">
            Hiring Jobs
          </CLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="header__inner__menu">
          <CLink
            activeClassName="--active"
            className="header__inner__menu__middle"
            to="/it-companies"
          >
            Companies
          </CLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="header__inner__menu">
          <CLink activeClassName="--active" to="/about-us">
            About our team
          </CLink>
        </CHeaderNavItem>
      </CHeaderNav>
      {getAuth().role ? (
        <CHeaderNav className="px-3">
          <p>{storeSetInfo.data.name}</p>
          <TheHeaderDropdown />
        </CHeaderNav>
      ) : (
        <CHeaderNav className="px-3">
          <Link to="/login" style={{ marginRight: "30px", color: "skyblue" }}>
            Login
          </Link>

          {/* <Link to="/register" style={{marginRight:"30px"}}>
            
              Register
           
          </Link> */}
          {/* 
          <Link to="/register-company" style={{marginRight:"40px"}}>
            
          Register for recruitment
         
        </Link> */}
        </CHeaderNav>
      )}
    </CHeader>
  );
};

export default TheHeaderUser;
