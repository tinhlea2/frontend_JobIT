import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link, useHistory } from "react-router-dom";
import { ROUTER_ADMIN, ROUTER_HOMEPAGE } from "src/utils/routes";
import { getAuth } from "src/utils/helpers";
import { useSelector } from "react-redux";

const TheHeaderDropdown = () => {
  const history = useHistory();

  const storeSetInfo = useSelector((store) => store.setInfo);
  const defaultAvatar =
    "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <p className="mr-2 mb-2">{storeSetInfo?.data?.name}</p>
        <div className="c-avatar">
          <CImg
            src={
              storeSetInfo.data.image ? storeSetInfo.data.image : defaultAvatar
            }
            className="c-avatar-img"
            alt="Admin"
            style={{ height: "100%", borderRadius: "50%" }}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <Link to="/profile" className="dropdown-item">
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </Link>

        {getAuth().role === "iter" ? (
          <>
            <Link to="/applied-jobs" className="dropdown-item">
              <i class="cil-reload mr-2"></i>
              Applied Job List
            </Link>
          </>
        ) : (
          <></>
        )}

        {getAuth().role === "admin" || getAuth().role === "moderator" ? (
          <CDropdownItem
            onClick={() => {
              localStorage.clear();
              history.push(ROUTER_ADMIN);
            }}
          >
            <i class="cil-exit-to-app mr-2"></i>
            Log Out
          </CDropdownItem>
        ) : (
          <CDropdownItem
            onClick={() => {
              localStorage.clear();
              history.push(ROUTER_HOMEPAGE);
            }}
          >
            <i class="cil-exit-to-app mr-2"></i>
            Log Out
          </CDropdownItem>
        )}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
