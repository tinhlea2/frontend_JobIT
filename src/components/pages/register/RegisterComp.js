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
import { ROUTER_HOMEPAGE } from "../../../utils/routes";
import { register } from "../../../redux/actions/register";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

const RegisterComp = () => {
  const role = "company";
  const history = useHistory();
  const storeRegister = useSelector((store) => store.register);
  const loading = storeRegister.loading;
  const [error, setError] = useState("");

  const [form, setForm] = React.useState({
    email: "",
    password: "",
    compName: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleRegister = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }

    const formData = {
      email: form.email,
      password: form.password,
      name: form.compName,
    };
    let isValid = true;

    if (form.password !== form.confirmPassword) isValid = false;
    if (isValid) {
      register(formData, role, (data) => {
        if (data.status === 200) {
          history.push(ROUTER_HOMEPAGE);
          toast.success("Register successfully! ", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("Fail! " + data.msg, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      });
    } else {
      toast.error("Please make sure your passwords match!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };
  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Loading..."
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "9999",
      }}
    >
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="5">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1 style={{ fontSize: "40px" }}>Register</h1>
                    <br />
                    <p className="text-muted mb-1">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="compName"
                        type="text"
                        placeholder="Company name"
                        value={form.compName}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Confirm password"
                        onChange={(event) => {
                          setForm({
                            ...form,
                            confirmPassword: event.target.value,
                          });
                          if (event.target.value !== form.password) {
                            setError("Passwords do not match!");
                          } else {
                            setError("");
                          }
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup
                      style={{ textAlign: "center", justifyContent: "center" }}
                      className="mb-2"
                    >
                      <span style={{ color: "#e55353", fontSize: "80%" }}>
                        {error}
                      </span>
                    </CInputGroup>
                    <CButton
                      className="btn--primary"
                      color=""
                      block
                      onClick={handleRegister}
                      disabled={
                        !form.compName ||
                        !form.email ||
                        !form.password ||
                        !form.confirmPassword
                      }
                    >
                      Create Account
                    </CButton>
                  </CForm>
                </CCardBody>
                <CCardFooter className="p-4">
                  <CRow>
                    <CCol xs="12" style={{ textAlign: "center" }}>
                      <p className="text-muted">
                        {" "}
                        Already have an account? <a href="/login">Login now!</a>
                      </p>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </LoadingOverlay>
  );
};

export default RegisterComp;
