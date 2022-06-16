import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TheLayout } from "./containers";
import LogInAdmin from "./containers/LogInAdmin";

import routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./scss/style.scss";
import "./styles/_main.scss";

import { ROUTER_ADMIN } from "./utils/routes";
import ForgotPassword from "./components/pages/ForgotPassword";
import Register from "./components/pages/register/Register";
import Login from "./components/pages/login/Login";
import HomePage from "./containers/HomePage";
import RegisterComp from "./components/pages/register/RegisterComp";
import ITCompanies from "./containers/ITCompanies";
import AboutUs from "./containers/AboutUs";
import ConfirmCode from "./components/pages/ConfirmCode";
import ChangePassword from "./components/pages/ChangePassword";
import DetailPost from "./components/common/DetailPost";
import PageNotFound from "./components/pages/404-page";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={TheLayout(HomePage)} />
        <Route path="/login" exact component={TheLayout(Login)} />
        <Route path="/register" exact component={TheLayout(Register)} />
        <Route
          path="/register-company"
          exact
          component={TheLayout(RegisterComp)}
        />
        <Route
          path="/forgot-password"
          exact
          component={TheLayout(ForgotPassword)}
        />
        <Route path="/confirm-code" exact component={TheLayout(ConfirmCode)} />
        <Route
          path="/change-password"
          exact
          component={TheLayout(ChangePassword)}
        />
        <Route path="/it-companies" exact component={TheLayout(ITCompanies)} />
        <Route path="/about-us" exact component={TheLayout(AboutUs)} />
        <Route path="/posts/:id" exact component={TheLayout(DetailPost)} />

        <Route path={ROUTER_ADMIN} component={LogInAdmin} exact />
        {routes.map((route, idx) => {
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                component={TheLayout(route.component)}
              />
            )
          );
        })}

        {/* <Route path="/" exact component={HomeComp} /> */}
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
