import React from "react";
import { Header, Footer } from "../components/layout";
import { Redirect } from "react-router";
import { ROUTER_ADMIN } from "./../utils/routes"
import { getAuth } from "../utils/helpers";

const withLayout = (Component) => (props) => {
  return (
    <div className="app">
       {(getAuth() && getAuth().token) ? (
        <>
          <div className="app__body">
            <Header/>
            <Component {...props}/>
            <Footer/>
          </div>
        </>
      ) : (
        <Redirect to={ROUTER_ADMIN}/>
      )}
    </div>
  );
};

export default withLayout;
