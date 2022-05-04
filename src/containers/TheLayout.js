import React from "react";
import { TheSidebar, TheFooter, TheHeader, TheHeaderUser } from "./index";
import { getAuth } from "../utils/helpers";
import { CContainer, CFade } from "@coreui/react";

const TheLayout = (Component) => (props) => {
  const auth = getAuth();

  return auth &&
    auth.token &&
    (auth.role === "admin" || auth.role === "moderator") ? (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body" style={{ backgroundColor: "#f7f7f7" }}>
          <main className="c-main" style={{ paddingTop: "0" }}>
            <CContainer fluid>
              <CFade>
                <Component {...props} />
              </CFade>
            </CContainer>
          </main>
        </div>
        <TheFooter />
      </div>
    </div>
  ) : (
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <TheHeaderUser />
        <div className="c-body" style={{ backgroundColor: "#f7f7f7" }}>
          <main className="c-main" style={{ paddingTop: "0" }}>
            <CContainer fluid>
              <CFade>
                <Component {...props} />
              </CFade>
            </CContainer>
          </main>
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
