import React from "react";
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
import { resetPassword } from "src/redux/actions/resetPassword";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const handleChange = (event) => {
    setEmail(event.target.value.trim());
  };
  const handleForgotPass = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }
    const data = { email: email };
    resetPassword(data, (data) => {
      if (data.status === 200) {
        toast.success("Send email successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        history.push({
          pathname: "/confirm-code",
          state: { email: email },
        });
      } else {
        toast.error("Fail to send! " + data.msg, {
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
                  <h1 style={{ fontSize: "30px" }}>Forgot Password?</h1>
                  <br />
                  <p className="text-muted">
                    Please enter your email address to receive a code to reset
                    password!
                  </p>
                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-envelope-closed" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="email"
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CButton
                  color="success"
                  block
                  onClick={handleForgotPass}
                  disabled={!email}
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

export default ForgotPassword;
