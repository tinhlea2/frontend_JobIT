import { CFooter, CLink } from "@coreui/react";
import React from "react";
import { getAuth } from "src/utils/helpers";
import logo from "../assets/images/logo.png";

const TheFooter = () => {
  const auth = getAuth();

  return auth &&
    auth.token &&
    (auth.role === "admin" || auth.role === "moderator") ? (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; 2021 PATNT .</span>
      </div>
    </CFooter>
  ) : (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__inner__logo">
          <img src={logo} alt="" />
          <p className="margin-t-s">© IT Jobs, Inc. 2021</p>
        </div>
        <div className="footer__inner__links">
          <div className="footer__inner__links__item">
            <p className="text--xlarge underline underline--secondary margin-b">
              learn more
            </p>
            <ul>
              <li>
                <CLink activeClassName="--active" exact to="/">
                  Home
                </CLink>
              </li>
              <li>
                <CLink activeClassName="--active" to="/about-us">
                  About us
                </CLink>
              </li>
            </ul>
          </div>
          <div className="footer__inner__links__item">
            <p className="text--xlarge underline underline--blue margin-b">
              support
            </p>
            <ul>
              <li>
                <CLink activeClassName="--active" to="/faq">
                  FAQ
                </CLink>
              </li>

              <li>
                <CLink activeClassName="--active" to="/articles">
                  Articles
                </CLink>
              </li>
            </ul>
          </div>
          <div className="footer__inner__links__item follow-us">
            <p className="text--xlarge underline underline--primary margin-b">
              Follow us
            </p>
            <ul>
              <li>
                <a href="https://twitter.com/it-jobs">
                  <span className="icon-twitter"></span>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/it-jobs">
                  <span className="icon-facebook"></span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/it-jobs">
                  <span className="icon-instagram"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(TheFooter);
