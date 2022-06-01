import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import LoadingOverlay from "react-loading-overlay";
// import ReactLoading from "react-loading";

import {
  CRow,
  CCol,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInput,
  CTextarea,
  CLabel,
  CCard,
  CCardBody,
  CInvalidFeedback,
} from "@coreui/react";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import { getITerCV } from "src/redux/actions/getITerCV";
import { createCV } from "src/redux/actions/createCV";
import axios from "axios";
import { getSignature } from "src/redux/actions/getSignature";
import { updateCV } from "src/redux/actions/updateCV";
import { technicalSkill } from "../common/constants";
import MultiSelect from "react-multi-select-component";
import LoadingOverlay from "react-loading-overlay";

const StyledCV = styled.div`
  .layout-cv {
    .cv-header {
      align-items: center;
      background: #d9d2c5;
      padding: 20px 0px;
      margin-bottom: 20px;
    }
    .cv-header-info {
      padding: 10px 100px;
      line-height: 30px;
      color: #73706c;
    }
    .label {
      font-weight: bold;
      font-size: 30px;
      margin-top: 10px;
    }
    .ul-list {
      list-style-type: circle;
      padding-left: 30px;
    }
  }
  .no-cv {
    margin-top: 20px;
    height: 350px;
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
`;

const CV = () => {
  const [isOpen, setOpen] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [isCV, setIsCV] = useState(false);
  const loading = useSelector((store) => store.getITerCV.loading);
  const loadingUpdate = useSelector((store) => store.updateCV.loading);
  const loadingCreate = useSelector((store) => store.createCV.loading);

  const [cv, setCV] = useState({});
  const [image, setImage] = useState("");
  const [curBirthday, setCurBirthday] = useState("");
  const [success, setSuccess] = useState(0);

  const [form, setForm] = React.useState({
    name: "",
    birthday: "",
    email: "",
    experience: "",
    skill: [],
    softSkill: "",
    description: "",
  });

  useEffect(() => {
    getITerCV((result) => {
      if (result.cv) {
        setCV(result.cv);
        setIsCV(true);
        const getTime = result.cv.birthday.split("/");
        if (getTime[0] < 10) getTime[0] = "0" + getTime[0];
        if (getTime[1] < 10) getTime[1] = "0" + getTime[1];
        setCurBirthday(getTime.reverse().join("-"));
        setForm({
          ...form,
          name: result.cv.name,
          birthday: result.cv.birthday,
          email: result.cv.email,
          experience: result.cv.experience,
          skill: result.cv.skill,
          softSkill: result.cv.softSkill,
          description: result.cv.description,
        });
        setImage(result.cv.image);
        setAvatar(result.cv.image);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const [selected, setSelected] = useState([]);

  const handleChange = (event) => {
    console.log(event.target.name + "=" + event.target.value);
    if (event.target.name === "birthday") {
      const date = new Date(event.target.value);
      setForm({
        ...form,
        birthday:
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear(),
      });
    } else {
      setForm({ ...form, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    form.skill = [];
    form.image = avatar || "";
    selected.map((item) => form.skill.push(item.value));

    const cv = {
      ...form,
    };

    let isValid = true;
    for (var key in cv) {
      if (cv[key] === "" || cv["skill"].length === 0) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      createCV(cv, (data) => {
        if (data.status === 200) {
          setSuccess(success + 1);
          toast.success("Create CV Successfully !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("Fail!", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      });
      setOpen(!isOpen);
    } else {
      toast.error("Please enter the empty input !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  // upload image

  const [avatar, setAvatar] = useState("/avatars/avatar.png");

  const [file, setFile] = useState(null);

  const [object, setObject] = useState({ signature: "", timestamp: "" });

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

  // update
  const handleUpdate = (event) => {
    console.log("update cv");
    event.preventDefault();

    form.skill = [];
    form.image = avatar || "";
    if (selected) {
      selected.map((item) => form.skill.push(item.value));
    }

    const cv = {
      ...form,
    };
    let isValid = true;
    for (var key in cv) {
      if (cv[key] === "" || cv["skill"].length === 0) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      updateCV(cv, (data) => {
        if (data.status === 200) {
          setSuccess(success + 1);
          toast.success("Update CV Successfully !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("Fail! " + data.msg, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      });
      setUpdate(!isUpdate);
    } else {
      toast.error("Please enter the empty input !", {
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
      active={loading || loadingUpdate || loadingCreate}
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
      <StyledCV>
        {isCV ? (
          <CRow className="mt-4" style={{ alignItems: "center" }}>
            <CCol md="2"></CCol>
            <CCol xs="12" className="mb-4" md="8">
              <CCard>
                <CCardBody>
                  <div className="layout-cv">
                    <CForm action="" method="" className="form-horizontal">
                      <CRow xs="12" md="12" className="cv-header">
                        <CCol md="3">
                          <img
                            src={cv.image}
                            alt="avatar"
                            width=" 200px"
                            height="200px"
                            style={{ borderRadius: "50%" }}
                          ></img>
                        </CCol>
                        <CCol md="9" className="cv-header-info">
                          <div style={{ fontSize: "50px" }}>{cv.name}</div>
                          <br></br>
                          Birthday:
                          <div>{cv.birthday}</div>
                          <CLabel htmlFor="date-input">Email:</CLabel>
                          <div>{cv.email}</div>
                        </CCol>
                      </CRow>

                      <CFormGroup row>
                        <CCol>
                          <CLabel className="label">Experiences</CLabel>
                        </CCol>
                      </CFormGroup>
                      <hr></hr>
                      <CFormGroup row>
                        <CCol>
                          <pre>{cv.experience}</pre>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol>
                          <CLabel className="label">Technical Skills</CLabel>
                        </CCol>
                      </CFormGroup>
                      <hr></hr>
                      <CFormGroup row>
                        <CCol>
                          <ul className="ul-list">
                            {cv.skill.map((item) => (
                              <li>{item}</li>
                            ))}
                          </ul>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol>
                          <CLabel className="label">Soft Skills</CLabel>
                        </CCol>
                      </CFormGroup>
                      <hr></hr>
                      <CFormGroup row>
                        <CCol>
                          <pre>{cv.softSkill}</pre>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol>
                          <CLabel className="label">Descriptions</CLabel>
                        </CCol>
                        <hr></hr>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol>
                          <pre>{cv.description}</pre>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup
                        row
                        style={{ background: "#D9D2C5", height: "30px" }}
                      ></CFormGroup>
                    </CForm>
                  </div>
                </CCardBody>
              </CCard>
              <div style={{ textAlign: "center" }}>
                <CButton
                  style={{ background: "#f25430", color: "white" }}
                  disabled={loading}
                  onClick={() => {
                    const curSkill = [];
                    cv.skill.map((skill) =>
                      curSkill.push({ label: skill, value: skill })
                    );
                    setSelected(curSkill);
                    setUpdate(!isUpdate);
                  }}
                >
                  Update CV
                </CButton>{" "}
              </div>
            </CCol>
            <CCol md="2"></CCol>
          </CRow>
        ) : (
          <CRow style={{ alignItems: "center", textAlign: "center" }}>
            <CCol xs="12" className="mb-4">
              <CCard className="no-cv">
                <CCardBody className="content">
                  <div>Create your CV to apply for jobs!</div>
                  <br></br>
                  <CButton
                    style={{
                      backgroundColor: "#4da6ff",
                      color: "white",
                    }}
                    disabled={loading}
                    onClick={() => setOpen(!isOpen)}
                  >
                    Create CV
                  </CButton>{" "}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )}

        <CModal show={isOpen} onClose={() => setOpen(!isOpen)} color="primary">
          <CModalHeader closeButton style={{ backgroundColor: "#4da6ff" }}>
            <CModalTitle>Your CV</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm
              id="create-form"
              action=""
              method="cv"
              className="form-horizontal was-validated"
            >
              <CRow xs="12" md="12">
                <CCol md="4" style={{ textAlign: "center" }}>
                  <img
                    src={avatar}
                    alt="avatar"
                    width=" 150px"
                    height="150px"
                    style={{ border: "1px solid #cccccc" }}
                  ></img>
                  <input
                    className="file-upload"
                    type="file"
                    onChange={handleFile}
                    style={{ display: "none" }}
                    ref={hiddenFileInput}
                  />
                </CCol>
                <CCol md="8">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      {/* <CInvalidFeedback className="help-block">
                      Enter a name
                    </CInvalidFeedback> */}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Birthday</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="birthday"
                        type="date"
                        defaultValue={form.birthday}
                        onChange={handleChange}
                        required
                      />
                      {/* <CInvalidFeedback className="help-block">
                      Choose your date of birth
                    </CInvalidFeedback> */}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="date-input">Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="email"
                        type="text"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                      {/* <CInvalidFeedback className="help-block">
                      Enter an email
                    </CInvalidFeedback> */}
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow xs="12" md="12" className="mb-2">
                <CCol md="4" style={{ textAlign: "center" }}>
                  <CButton
                    style={{
                      textAlign: "center",
                      backgroundColor: "#4da6ff",
                      border: "0",
                    }}
                    color="primary"
                    onClick={handleClick}
                  >
                    Choose avatar
                  </CButton>
                </CCol>
                <CCol md="8"></CCol>
              </CRow>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Experiences</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea
                    rows="5"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    required
                  />
                  <CInvalidFeedback className="help-block">
                    Enter some experiences
                  </CInvalidFeedback>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Technical skills</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <MultiSelect
                    options={technicalSkill}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Soft skills</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea
                    name="softSkill"
                    rows="5"
                    value={form.softSkill}
                    onChange={handleChange}
                    required
                  />
                  <CInvalidFeedback className="help-block">
                    Enter some soft skills
                  </CInvalidFeedback>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="textarea-input">Description</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea
                    name="description"
                    rows="5"
                    placeholder=""
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                  <CInvalidFeedback className="help-block">
                    Enter a description
                  </CInvalidFeedback>
                </CCol>
              </CFormGroup>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="success"
              onClick={handleSubmit}
              style={{ backgroundColor: "#4da6ff" }}
            >
              Create
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() => {
                document.getElementById("create-form").reset();
                setOpen(!isOpen);
                setForm({
                  name: "",
                  birthday: "",
                  email: "",
                  experience: "",
                  skill: [],
                  softSkill: "",
                  description: "",
                });
                setSelected([]);
                setAvatar("/avatars/avatar.png");
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal
          show={isUpdate}
          onClose={() => setUpdate(!isUpdate)}
          color="primary"
        >
          <CModalHeader closeButton>
            <CModalTitle>Your CV</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm
              action=""
              method="cv"
              className="form-horizontal was-validated"
            >
              <CRow xs="12" md="12" style={{ textAlign: "center" }}>
                <CCol md="4">
                  <img
                    src={avatar}
                    alt="avatar"
                    width=" 150px"
                    height="150px"
                    style={{ border: "1px solid #cccccc" }}
                  ></img>
                  <input
                    className="file-upload"
                    type="file"
                    onChange={handleFile}
                    style={{ display: "none" }}
                    ref={hiddenFileInput}
                  />
                </CCol>
                <CCol md="8">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Full Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="name"
                        defaultValue={cv.name}
                        onChange={handleChange}
                        required
                      />
                    </CCol>
                    <CInvalidFeedback className="help-block">
                      Enter your name
                    </CInvalidFeedback>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Birthday</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="birthday"
                        type="date"
                        defaultValue={curBirthday}
                        onChange={handleChange}
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Choose your date of birth
                      </CInvalidFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="date-input">Email</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="email"
                        type="text"
                        defaultValue={cv.email}
                        onChange={handleChange}
                        required
                      />
                      <CInvalidFeedback className="help-block">
                        Enter your email
                      </CInvalidFeedback>
                    </CCol>
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow xs="12" md="12" className="mb-2">
                <CCol md="4" style={{ textAlign: "center" }}>
                  <CButton
                    style={{ textAlign: "center" }}
                    color="primary"
                    onClick={handleClick}
                  >
                    Choose image
                  </CButton>
                </CCol>
                <CCol md="8"></CCol>
              </CRow>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Experiences</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea
                    rows="5"
                    name="experience"
                    defaultValue={cv.experience}
                    onChange={handleChange}
                    required
                  />
                  <CInvalidFeedback className="help-block">
                    Enter some experience
                  </CInvalidFeedback>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Technical skills</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <MultiSelect
                    options={technicalSkill}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Soft skills</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea
                    name="softSkill"
                    rows="5"
                    defaultValue={cv.softSkill}
                    onChange={handleChange}
                    required
                  />
                  <CInvalidFeedback className="help-block">
                    Enter some soft skills
                  </CInvalidFeedback>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="textarea-input">Description</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea
                    name="description"
                    rows="5"
                    placeholder=""
                    defaultValue={cv.description}
                    onChange={handleChange}
                    required
                  />
                  <CInvalidFeedback className="help-block">
                    Enter a description
                  </CInvalidFeedback>
                </CCol>
              </CFormGroup>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="success" onClick={handleUpdate}>
              Update
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() => {
                setUpdate(!isUpdate);
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      </StyledCV>
    </LoadingOverlay>
  );
};

export default CV;
