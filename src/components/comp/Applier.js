import React, { useState, useEffect } from "react";

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
  CBadge,
  CInputRadio,
} from "@coreui/react";
import { useHistory, useParams } from "react-router-dom";
import { getAppliers } from "../../redux/actions/getAppliers";
import { getCV } from "../../redux/actions/getCV";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import _ from "lodash";
import { response } from "src/redux/actions/response";

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
  const [statusList, setStatusList] = useState([]);
  const [cv, setCV] = useState({ skill: [] });
  const [title, setTitle] = useState("");
  const [isOpen, setOpen] = useState(false);
  const loading = useSelector((store) => store.getAppliers.loading);
  const loadingCV = useSelector((store) => store.getCV.loading);

  const loadingResponse = useSelector((store) => store.response.loading);

  const id = match.params.id;
  const [success, setSuccess] = useState(0);
  const history = useHistory();
  useEffect(() => {
    getAppliers(id, (result) => {
      if (result.applies.length > 0) {
        setAppliers(result.applies);
        setTitle(result.title);
        setStatusList(
          result.applies.map((item) => ({
            iterId: item.iterId,
            status: item.status,
          }))
        );
      }
    });
  }, [id, success]);

  const handleGetCV = (cvId) => {
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

  const isResponse = () => {
    return (
      statusList.findIndex(
        (item) => item.status === "agreed" || item.status === "rejected"
      ) + 1
    );
  };

  const changePermissions = (event) => {
    const id = event.target.value.slice(0, -1);

    const value = event.target.value.slice(-1);
    const checkedValue = value === "n" ? "reject" : "agree";

    const tmp = statusList.map((item) => ({
      ...item,
      status: item.iterId === id ? checkedValue : item.status,
    }));

    setStatusList(tmp);
  };

  const data = {
    listResponse: statusList,
  };

  const updateUserPermissionsHandler = (event) => {
    event.preventDefault();

    response(id, data, (data) => {
      if (data.status === 200) {
        setSuccess(success + 1);
        toast.success("Response successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.error("Fail to Response! " + data.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };

  const cancelUpdatedPermissionsHandler = () => {
    setSuccess(success + 1);
  };
  return (
    <LoadingOverlay
      active={loading || loadingCV}
      spinner
      text="Loading..."
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "9999",
      }}
    >
      <CRow>
        <CCol>
          <div
            className="flex align-item mt-3"
            style={{
              fontSize: "20px",
              fontWeight: 500,
              cursor: "pointer",
            }}
            onClick={() => history.goBack()}
          >
            <i class="cil-arrow-left mr-2"></i>
            Back
          </div>
          <CCard className="card-content">
            <CCardHeader>
              <p>Post ID: {match.params.id}</p>

              <span>Post title: {title}</span>
            </CCardHeader>
            <CCardBody>
              {appliers && statusList.length > 0 && appliers.length > 0 ? (
                <div>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Full name</th>
                        <th>Email</th>
                        <th>Applied Date</th>
                        <th>CV</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appliers &&
                        statusList &&
                        appliers.map((applier, index) => {
                          let date = new Date(applier.timeApply);
                          let dd = String(date.getDate()).padStart(2, "0");
                          let mm = String(date.getMonth() + 1).padStart(2, "0");
                          let yyyy = date.getFullYear();
                          let day = dd + "/" + mm + "/" + yyyy;
                          return (
                            <tr key={applier._id}>
                              <td>{index + 1}</td>
                              <td>{applier.name}</td>
                              <td>{applier.email}</td>
                              <td>{day}</td>
                              <td>
                                <CTooltip
                                  content="view CV"
                                  placement="bottom-start"
                                >
                                  <CBadge
                                    style={{
                                      padding: "8px 10px 6px",
                                      letterSpacing: 2,
                                      cursor: "pointer",
                                    }}
                                    color="success"
                                    onClick={() => {
                                      handleGetCV(applier.cvId);
                                    }}
                                  >
                                    <i
                                      className="cil-description"
                                      style={{
                                        fontSize: 16,
                                      }}
                                    ></i>
                                  </CBadge>
                                </CTooltip>
                              </td>
                              <td>
                                <CBadge
                                  style={{
                                    padding: "6px 12px 4px",
                                    letterSpacing: 2,
                                    borderRadius: 16,
                                  }}
                                  color={
                                    _.get(applier, "status") === "pending"
                                      ? "info"
                                      : "warning"
                                  }
                                >
                                  {_.get(applier, "status") === "pending"
                                    ? "PENDING"
                                    : "RESPONDED"}
                                </CBadge>
                              </td>
                              <td>
                                {
                                  <>
                                    <CFormGroup variant="custom-radio" inline>
                                      <CInputRadio
                                        custom
                                        id={applier.iterId + "y"}
                                        name={applier.iterId + "name"}
                                        value={applier.iterId + "y"}
                                        defaultChecked={
                                          statusList[index].status === "agreed"
                                        }
                                        onChange={changePermissions}
                                        disabled={
                                          statusList[index].status ===
                                            "rejected" ||
                                          statusList[index].status === "agreed"
                                        }
                                      />
                                      <CLabel
                                        variant="custom-checkbox"
                                        htmlFor={applier.iterId + "y"}
                                      >
                                        Accept
                                      </CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="custom-radio" inline>
                                      <CInputRadio
                                        custom
                                        id={applier.iterId + "n"}
                                        name={applier.iterId + "name"}
                                        value={applier.iterId + "n"}
                                        defaultChecked={
                                          statusList[index].status ===
                                          "rejected"
                                        }
                                        onChange={changePermissions}
                                        disabled={
                                          statusList[index].status ===
                                            "rejected" ||
                                          statusList[index].status === "agreed"
                                        }
                                      />
                                      <CLabel
                                        variant="custom-checkbox"
                                        htmlFor={applier.iterId + "n"}
                                      >
                                        Deny
                                      </CLabel>
                                    </CFormGroup>
                                  </>
                                }
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
            <div className="flex flex-end">
              <CButton
                color="primary"
                className="mr-1 right-btn"
                onClick={updateUserPermissionsHandler}
              >
                Save
              </CButton>
              <CButton
                color="warning"
                className="mr-1 right-btn"
                onClick={cancelUpdatedPermissionsHandler}
              >
                Cancel
              </CButton>
            </div>
          </CCard>
        </CCol>
      </CRow>
    </LoadingOverlay>
  );
};

export default Applier;
