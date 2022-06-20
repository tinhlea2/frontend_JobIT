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
import { toast } from "react-toastify";
import { confirmCode } from "src/redux/actions/confirmCode";

const ConfirmCode = () => {
  const history = useHistory();
  const email = history.location.state && history.location.state.email;
  const [code, setCode] = React.useState("");
  const handleChange = (event) => {
    setCode(event.target.value.trim());
  };
  const handleConfirmCode = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }
    const data = {
      email: email,
      code: code,
    };
    console.log(email);
    confirmCode(data, (data) => {
      if (data.status === 200) {
        toast.success("Enter code correctly !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        history.push({
          pathname: "/change-password",
          state: { email: email, code: code },
        });
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
          <CCol xl="5">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1 style={{ fontSize: "30px" }}>Check your email</h1>
                  <br />
                  <p className="text-muted">
                    Please enter your authentication code!
                  </p>
                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      name="code"
                      type="text"
                      placeholder="Code"
                      value={code}
                      onChange={handleChange}
                    />
                  </CInputGroup>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CButton
                  color="success"
                  block
                  onClick={handleConfirmCode}
                  disabled={!code}
                >
                  Confirm
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ConfirmCode;
