import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { changePassword } from "src/redux/actions/changePassword";

const ChangePassword = () => {
  const history = useHistory();
  const email = history.location.state && history.location.state.email;
  const code = history.location.state && history.location.state.code;
  
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setPassword(event.target.value.trim());
  };
  const handleForgotPass = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }
    const data = {
      email: email,
      code: code,
      password: password,
    };
    changePassword(data, (data) => {
      if (data.status === 200) {
        toast.success("Change password successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        history.push("/login");
      } else {
        toast.error("Fail! " + data.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xl="4">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1 style={{ fontSize: "30px" }}>Reset Password</h1>
                  <br />
                  <p className="text-muted mb-3">
                    Please enter your new password!
                  </p>
                  {/* <CInputGroup className="mb-2">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="Oldpassword"
                      type="password"
                      placeholder="Old password"
                      value={password}
                      onChange={handleChange}
                    />
                  </CInputGroup> */}
                  <CInputGroup className="mb-2">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-2">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Confirm password"
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        if (event.target.value !== password) {
                          setError("Passwords do not match!");
                        } else {
                          setError("");
                        }
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup
                    style={{ textAlign: "center", justifyContent: "center" }}
                    className="mt-2"
                  >
                    <span style={{ color: "#e55353", fontSize: "80%" }}>
                      {error}
                    </span>
                  </CInputGroup>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CButton
                  color="success"
                  block
                  onClick={handleForgotPass}
                  disabled={!password || !confirmPassword}
                >
                  Send
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ChangePassword;
