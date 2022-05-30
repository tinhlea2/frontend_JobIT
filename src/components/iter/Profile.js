import React, { useState, useEffect } from "react";
// import LoadingOverlay from "react-loading-overlay";
// import ReactLoading from "react-loading";
import axios from "axios";
import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CCard,
  CCardBody,
  CInvalidFeedback,
} from "@coreui/react";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import { getProfile } from "../../redux/actions/getProfile";
import { updateProfile } from "../../redux/actions/updateProfile";
import styled from "styled-components";
import { getSignature } from "src/redux/actions/getSignature";
import { updatePass } from "src/redux/actions/updatePass";
import { getAuth, setAuth } from "src/utils/helpers";
import { useSelector } from "react-redux";
import { setInfo } from "src/redux/actions/setInfo";
import LoadingOverlay from "react-loading-overlay";
const StyledProfile = styled.section`
  .avatar-wrapper {
    position: relative;
    height: 200px;
    width: 200px;
    margin: 25px auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 1px 1px 15px -5px black;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.05);
      cursor: pointer;
    }
    &:hover .profile-pic {
      opacity: 0.5;
    }
    .profile-pic {
      height: 100%;
      width: 100%;
      transition: all 0.3s ease;
      &:after {
        font-family: FontAwesome;
        content: "\f007";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        font-size: 190px;
        background: #ecf0f1;
        color: #34495e;
        text-align: center;
      }
    }
  }
`;
const Profile = () => {
  // const loading = useSelector((store) => store.getProfile.loading);
  const [error, setError] = useState("");
  const storeSetInfo = useSelector((store) => store.setInfo);
  const loading = storeSetInfo.loading;
  const storeUpdate = useSelector((store) => store.updateProfile);
  const loadingUpdate = storeUpdate.loading;
  const storePass = useSelector((store) => store.updatePass);
  const loadingPass = storePass.loading;

  const [avatar, setAvatar] = useState(storeSetInfo.data.image);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(storeSetInfo.data.image);

  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newConPass, setNewConPass] = useState("");

  const [file, setFile] = useState(null);

  const [object, setObject] = useState({ signature: "", timestamp: "" });

  useEffect(() => {
    getProfile((result) => {
      setEmail(result.user.email);
      setName(result.user.name);
      setPhone(result.user.phone);
      setAddress(result.user.address);

      if (result.user.image) {
        setAvatar(result.user.image);
      }
    });
  }, []);

  useEffect(() => {
    if (object.signature === "" && object.timestamp === "") return;
    if (!file) return;
    const formData = new FormData();
    // Update the formData object
    formData.append("file", file, file.name);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/do-an-cnpm/image/upload?api_key=484176915684615&timestamp=${object.timestamp}&signature=${object.signature}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setImage(response.data.url);
      });
  }, [object, file]);

  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
    getSignature((data) => {
      if (data.status === 200) {
        setObject({
          ...object,
          signature: data.payload.signature,
          timestamp: data.payload.timestamp,
        });
      } else {
        toast.error("Error! " + data.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };

  const handleFile = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };
  const handleChange = (event) => {
    if (event.target.name === "name") setName(event.target.value);
    if (event.target.name === "phone") setPhone(event.target.value);
    if (event.target.name === "address") setAddress(event.target.value);
  };

  const saveChanges = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }

    let data = {};
    if (name !== "") {
      data = { ...data, name };
    }
    if (phone !== "") {
      data = { ...data, phone };
    }
    if (address !== "") {
      data = { ...data, address };
    }
    if (image !== "") {
      data = { ...data, image };
    } else {
    }
    updateProfile(data, (data) => {
      if (data.status === 200) {
        toast.success("Update successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setAuth({ ...getAuth(), image: image, name: name });
        setInfo({ name: name, image: image });
      } else {
        toast.error("Error! " + data.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };
  const handleChangePass = (event) => {
    if (event.target.name === "pass") setPass(event.target.value);
    if (event.target.name === "newPass") setNewPass(event.target.value);
    if (event.target.name === "newConPass") setNewConPass(event.target.value);
  };
  const changePass = (event) => {
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }

    let data = { password: pass, newPassword: newPass };
    let isValid = true;

    if (newPass !== newConPass) isValid = false;
    if (isValid) {
      updatePass(data, (result) => {
        if (result.status === 200) {
          toast.success("Update password successfully !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          document.getElementById("pass-form").reset();
        } else {
          toast.error("Fail to update! " + data.msg, {
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

  const overrideLoadingCSS = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <LoadingOverlay
      active={loading || loadingUpdate || loadingPass}
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
      <StyledProfile>
        <CRow className="mt-4">
          <CCol
            xs="12"
            className="mb-4"
            style={{
              textAlign: "center",
              paddingLeft: "20px",
              maxWidth: "30%",
            }}
          >
            {/* <CCol xs="12" className="mb-4" md="3"> */}
            <CCard>
              <CCardBody style={{ display: "flex", flexDirection: "column" }}>
                <div className="avatar-wrapper">
                  <img className="profile-pic" src={avatar} alt="avatar" />
                </div>

                <input
                  className="file-upload"
                  type="file"
                  onChange={handleFile}
                  style={{ display: "none" }}
                  ref={hiddenFileInput}
                />
                <CButton className="btn--secondary" onClick={handleClick}>
                  Choose avatar
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs="12" className="mb-4" md="7">
            <CCard>
              <CCardBody>
                <CForm
                  action=""
                  method="post"
                  className="form-horizontal  was-validated"
                  style={{ width: "100%" }}
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Full name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Enter a username
                      </CInvalidFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Phone number</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Enter a phone number
                      </CInvalidFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Address</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="address"
                        name="address"
                        value={address}
                        onChange={handleChange}
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Enter a address
                      </CInvalidFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="email"
                        name="email"
                        value={email}
                        disabled={true}
                      />
                    </CCol>
                  </CFormGroup>

                  <CButton
                    color="success"
                    onClick={saveChanges}
                    disabled={!name || !phone || !address}
                  >
                    Save changes
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol
            xs="12"
            className="mb-4"
            style={{
              textAlign: "center",
              paddingLeft: "20px",
              maxWidth: "30%",
            }}
          >
            {/* <CCol xs="12" className="mb-4" md="3"> */}
            <CCard style={{ display: "none" }}>
              <CCardBody style={{ display: "flex", flexDirection: "column" }}>
                <div className="avatar-wrapper">
                  <img className="profile-pic" src={avatar} alt="avatar" />
                </div>

                <input
                  className="file-upload"
                  type="file"
                  onChange={handleFile}
                  style={{ display: "none" }}
                  ref={hiddenFileInput}
                />
                <CButton className="btn--secondary" onClick={handleClick}>
                  Choose avatar
                </CButton>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol xs="12" className="mb-4" md="7">
            <CCard>
              <CCardBody>
                <CForm
                  action=""
                  method="post"
                  className="form-horizontal"
                  style={{ width: "100%" }}
                  id="pass-form"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Current password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="password"
                        id="pass"
                        name="pass"
                        // value=""
                        onChange={handleChangePass}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>New password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="password"
                        id="newPass"
                        name="newPass"
                        // value=""
                        onChange={handleChangePass}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Confirm password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="password"
                        id="newConPass"
                        name="newConPass"
                        // value=""
                        onChange={(event) => {
                          setNewConPass(event.target.value);
                          if (event.target.value !== newPass) {
                            setError("Passwords do not match!");
                          } else {
                            setError("");
                          }
                        }}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup style={{ textAlign: "center" }}>
                    <span style={{ color: "#e55353", fontSize: "80%" }}>
                      {error}
                    </span>
                  </CFormGroup>
                  <CButton
                    color="success"
                    onClick={changePass}
                    disabled={!pass || !newPass || !newConPass}
                  >
                    Change password
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </StyledProfile>
    </LoadingOverlay>
  );
};

export default Profile;
