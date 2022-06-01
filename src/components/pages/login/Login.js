import React from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { login } from "../../../redux/actions/login";
import { ROUTER_HOMEPAGE } from "../../../utils/routes";
import { getAuth, setAuth } from "../../../utils/helpers";
import { toast } from "react-toastify";
import { setInfo } from "src/redux/actions/setInfo";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import { FaEye } from "react-icons/fa";
const Login = () => {
  const history = useHistory();
  const storeLogin = useSelector((store) => store.login);
  const loading = storeLogin.loading;
  const [form, setForm] = React.useState({ email: "", password: "" });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }

    const formData = {
      email: form.email,
      password: form.password,
    };
    login(formData, (result) => {
      if (result.status === 200) {
        let image = getAuth().image;
        if (!result.image) {
          image =
            "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png";
        } else {
          image = result.image;
        }
        const data = {
          image: image,
          role: result.user.role,
          name: result.user.name,
          token: result.token,
          userId: result.user.userId,
        };
        setInfo({ name: result.user.name, image: image });
        setAuth(data);
        history.push(ROUTER_HOMEPAGE);
        toast.success("Login successfully! ", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.error("Fail! " + result.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };

  var isBool = true;
  const showHidden = () => {
    if (isBool) {
      document.getElementById("password").setAttribute("type", "text");
      isBool = false;
    } else {
      document.getElementById("password").setAttribute("type", "password");
      isBool = true;
    }
  };

  const overrideLoadingCSS = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <LoadingOverlay
      active={loading}
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
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="6">
              <CCardGroup>
                <CCard
                  className="p-4"
                  style={{
                    borderRadius: "10px",
                    borderStyle: "outset",
                    borderWidth: "5px",
                  }}
                >
                  <CCardBody>
                    <CForm onSubmit={handleLogin}>
                      <h1 style={{ fontSize: "50px", textAlign: "center" }}>
                        Login
                      </h1>
                      <br />
                      <p className="text-muted">Sign in to your account</p>
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
                          autoComplete="email"
                          value={form.email}
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
                          name="password"
                          type="password"
                          id="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={form.password}
                          onChange={handleChange}
                        />
                        <FaEye
                          style={{
                            position: "absolute",
                            bottom: 9,
                            right: 25,
                            cursor: "pointer",
                          }}
                          onClick={showHidden}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="5">
                          <CButton
                            style={{ marginLeft: "80px" }}
                            className="px-4 btn--primary "
                            onClick={handleLogin}
                            disabled={!form.email || !form.password}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <Link to="/forgot-password">
                            <CButton
                              className="px-0 text--primary"
                              style={{ marginRight: "50px" }}
                            >
                              Forgot password?
                            </CButton>
                          </Link>
                        </CCol>
                      </CRow>
                      <CRow style={{ marginTop: "10px" }}>
                        <Link
                          to="/register"
                          style={{ marginLeft: "150px", color: "#4da6ff" }}
                        >
                          Register
                        </Link>

                        <p style={{ marginLeft: "10px", marginRight: "10px" }}>
                          or
                        </p>

                        <Link
                          to="/register-company"
                          style={{ color: "#4da6ff" }}
                        >
                          Register for recruitment
                        </Link>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </LoadingOverlay>
  );
};

export default Login;
