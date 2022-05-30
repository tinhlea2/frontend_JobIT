import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CModal,
  CFormGroup,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CLabel,
  CModalFooter,
  CTooltip,
} from "@coreui/react";

import { getAppliers } from "../../redux/actions/getAppliers";
import { getCV } from "../../redux/actions/getCV";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

const StyledCV = styled.div`
  .layout-cv {
    .cv-header {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      background: #2eb85c;
      padding: 20px 0px;
      color: white;
      line-height: 30px;
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
  .no-result {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Applier = ({ match }) => {
  const [appliers, setAppliers] = useState([]);
  const [cv, setCV] = useState({ skill: [] });
  const [title, setTitle] = useState("");
  const [isOpen, setOpen] = useState(false);
  const loading = useSelector((store) => store.getAppliers.loading);
  const loadingCV = useSelector((store) => store.getCV.loading);

  const id = match.params.id;

  useEffect(() => {
    getAppliers(id, (result) => {
      if (result.applies.length > 0) {
        setAppliers(result.applies);
        setTitle(result.title);
      }
    });
  }, [id]);

  const handleGetCV = (cvId) => {
    console.log("get CV");

    getCV(cvId, (data) => {
      if (data.status === 200) {
        setOpen(!isOpen);
        setCV(data.cv);
      } else {
        toast.error("Error! " + data.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };
  const softSkill = cv.softSkill ? cv.softSkill.split(",") : [];

  const overrideLoadingCSS = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <LoadingOverlay
      active={loading || loadingCV}
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
        <CCol>
          <CCard className="card-content">
            <CCardHeader>
              <p>Post ID: {match.params.id}</p>

              <span>Post title: {title}</span>
            </CCardHeader>
            <CCardBody>
              {appliers && appliers.length > 0 ? (
                <div>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Full name</th>
                        <th>Email</th>
                        <th>Applied Date</th>
                        <th>CV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appliers &&
                        appliers.map((applier) => {
                          let date = new Date(applier.timeApply);
                          let dd = String(date.getDate()).padStart(2, "0");
                          let mm = String(date.getMonth() + 1).padStart(2, "0");
                          let yyyy = date.getFullYear();
                          let day = dd + "/" + mm + "/" + yyyy;
                          return (
                            <tr key={applier._id}>
                              <td>{applier.name}</td>
                              <td>{applier.email}</td>
                              <td>{day}</td>
                              <td>
                                <CTooltip
                                  content="view CV"
                                  placement="bottom-start"
                                >
                                  <CButton
                                    color="success"
                                    onClick={() => {
                                      handleGetCV(applier.cvId);
                                    }}
                                  >
                                    <i className="cil-description"></i>
                                  </CButton>
                                </CTooltip>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="no-result">
                  <h4>This post doesn't have any appliers!</h4>
                </div>
              )}
              <CModal
                show={isOpen}
                onClose={() => setOpen(!isOpen)}
                color="success"
              >
                <CModalHeader closeButton>
                  <CModalTitle>{cv.iterId}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <StyledCV>
                    <div className="layout-cv">
                      <CForm action="" method="" className="form-horizontal">
                        <CRow className="cv-header">
                          <img
                            src={cv.image}
                            alt="avatar"
                            width=" 200px"
                            height="200px"
                            style={{ borderRadius: "50%" }}
                          ></img>
                        </CRow>

                        <CRow className="cv-header mb-2">
                          <div>
                            <div style={{ fontSize: "30px" }}>{cv.name}</div>
                            <div>Birthday: {cv.birthday}</div>

                            <div>Email: {cv.email}</div>
                          </div>
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
                            <ul className="ul-list">
                              {softSkill.map((item) => (
                                <li>{item}</li>
                              ))}
                            </ul>
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
                          style={{
                            background: "#2EB85C",
                            height: "30px",
                          }}
                        ></CFormGroup>
                      </CForm>
                    </div>
                  </StyledCV>
                </CModalBody>
                <CModalFooter>
                  <CButton
                    color="secondary"
                    onClick={() => {
                      setOpen(!isOpen);
                    }}
                  >
                    Cancel
                  </CButton>
                </CModalFooter>
              </CModal>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </LoadingOverlay>
  );
};

export default Applier;
