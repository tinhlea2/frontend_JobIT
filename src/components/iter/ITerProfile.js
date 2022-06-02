import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Profile, CV } from "./index";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import {
  CRow,
  CCol,
  CLabel,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CSwitch,
} from "@coreui/react";
import { getITerCV } from "src/redux/actions/getITerCV";
import { receiveEmail } from "src/redux/actions/receiveEmail";
import { getAuth } from "src/utils/helpers";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";
const ITerProfile = () => {
  const storeProfile = useSelector((store) => store.getITerCV);
  const loading = storeProfile.loading;
  const storeMail = useSelector((store) => store.receiveEmail);
  const loadingMail = storeMail.loading;
  const [isReceive, setIsReceive] = useState(null);

  useEffect(() => {
    getITerCV((result) => {
      if (getAuth().role === "iter" && result.cv) {
        setIsReceive(result.cv.receiveMail);
      }
    });
  }, []);

  useEffect(() => {
    if (isReceive === null || getAuth().role === "company") {
      return;
    }
    receiveEmail(
      {
        receive: isReceive,
      },
      (result) => {
        if (result.status === 200) {
          toast.success(result.msg, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          document.getElementById("myCheck").checked = false;
          toast.error("Fail! " + result.msg, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      }
    );
  }, [isReceive]);

  const handleReceiveEmail = () => {
    setIsReceive(!isReceive);
  };

  const overrideLoadingCSS = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <LoadingOverlay
      active={loading || loadingMail}
      spinner={
        <BeatLoader css={overrideLoadingCSS} color="rgb(77, 166, 255)" />
      }
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgb(172 165 165 / 50%)",
        }),
      }}
    >
      <CRow>
        <CCol xs="12" className="mb-4">
          <CCard className="card-content">
            <CCardBody>
              <CTabs>
                <div style={{ display: "flex" }}>
                  {" "}
                  <CNav variant="tabs" style={{ width: "86%" }}>
                    <CNavItem>
                      <CNavLink className="text--secondary">
                        My Profile
                      </CNavLink>
                    </CNavItem>
                    {getAuth().role === "iter" && (
                      <CNavItem>
                        <CNavLink className="text--secondary">My CV</CNavLink>
                      </CNavItem>
                    )}
                  </CNav>
                  {getAuth().role === "iter" && (
                    <>
                      <CLabel className="mr-2">Receive jobs information</CLabel>
                      <CSwitch
                        id={"myCheck"}
                        className={"mx-1"}
                        color={"danger"}
                        labelOn={"\u2713"}
                        labelOff={"\u2715"}
                        defaultChecked={isReceive}
                        onClick={
                          getAuth().role === "iter" && handleReceiveEmail
                        }
                      />
                    </>
                  )}
                </div>

                <CTabContent>
                  <CTabPane>
                    <Profile />
                  </CTabPane>
                  {getAuth().role === "iter" && (
                    <CTabPane>
                      <CV />
                    </CTabPane>
                  )}
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </LoadingOverlay>
  );
};

export default ITerProfile;
