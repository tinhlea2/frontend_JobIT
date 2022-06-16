import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { getAuth } from "src/utils/helpers";
import { toast } from "react-toastify";
import { apply } from "../../redux/actions/apply";
import defaultImage from "../../assets/images/default_image.png";
import { getPostDetail } from "src/redux/actions/getPostDetail";

import {
  CCard,
  CCardBody,
  CFormGroup,
  CCol,
  CRow,
  CForm,
  CLabel,
  CButton,
  CContainer,
} from "@coreui/react";

const StyledCV = styled.div`
  .layout-cv {
    .content {
      font-size: 18px;
    }
    .cv-header {
      align-items: center;
      background: #00000012;
      padding: 20px 0px;
      margin-bottom: 20px;
      border-radius: 5px;
      color: black;
    }
    .cv-header-info {
      padding: 10px 50px;
      font-size: 20px;
      line-height: 40px;
      // color: white;
    }
    .label {
      font-size: 30px;
      margin-top: 10px;
    }
    .skill {
      /* list-style-type: circle; */
      padding: 10px;
      border-radius: 5px;
      margin: 0px 5px;
      border: 1px solid lightblue;
    }
    .title {
      font-size: 30px;
      padding: 20px 0px;
    }
    .btn-apply {
      font-size: 20px;
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

function DetailPost() {
  const [post, setPost] = useState({});
  const [company, setCompany] = useState({});
  const [skill, setSkill] = useState([]);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getPostDetail(id, (item) => {
      setPost(item.post);
      setCompany(item.post.company[0]);
      setSkill(item.post.skill);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledCV>
      {post ? (
        <CRow className="mt-4" style={{ alignItems: "center" }}>
          <CCol md="2"></CCol>
          <CCol xs="12" className="mb-4" md="8">
            <CCard>
              <CCardBody>
                <div className="layout-cv">
                  <div
                    className="flex align-item"
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
                  <CForm action="" method="" className="form-horizontal">
                    <CRow className="title" style={{ padding: "20px" }}>
                      <div
                        className="flex align-item"
                        style={{ width: "100%" }}
                      >
                        <i class="cil-tags mr-2"></i> {post.title}
                        {/* <CButton
                          color="danger"
                          className="btn-apply"
                          onClick={() => {
                            if (!getAuth().token) {
                              history.push("/login");
                            } else {
                              if (getAuth().role === "iter") {
                                apply(post._id, (data) => {
                                  if (data.status === 200) {
                                    toast.success("Apply successfully !", {
                                      position: toast.POSITION.BOTTOM_LEFT,
                                    });
                                  } else {
                                    toast.error("Fail to apply! " + data.msg, {
                                      position: toast.POSITION.BOTTOM_LEFT,
                                    });
                                  }
                                });
                              } else {
                                toast.warn("Only ITer can apply job! ", {
                                  position: toast.POSITION.BOTTOM_LEFT,
                                });
                              }
                            }
                          }}
                        >
                          Apply Now
                        </CButton>{" "} */}
                      </div>
                    </CRow>
                    <CRow xs="12" md="12" className="cv-header">
                      <CCol md="3">
                        <img
                          src={company.image ? company.image : defaultImage}
                          alt="avatar"
                          width=" 200px"
                          height="200px"
                          style={{ borderRadius: "5px", objectFit: "cover" }}
                        ></img>
                      </CCol>
                      <CCol md="9" className="cv-header-info">
                        <div style={{ fontSize: "40px" }}>{company.name}</div>
                        <br></br>
                        <div>
                          <i className="cil-envelope-open"></i> {company.email}
                        </div>

                        <div>
                          <i className="cil-phone"></i> {company.phone}
                        </div>

                        <div>
                          <i className="cil-location-pin"></i> {company.address}
                        </div>
                      </CCol>
                    </CRow>

                    <CContainer className="content">
                      <CFormGroup row>
                        <CCol>
                          <CLabel className="label">Required Skills</CLabel>
                        </CCol>
                      </CFormGroup>
                      <hr></hr>
                      <CFormGroup row>
                        <CCol
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          {skill.map((item) => (
                            <span
                              className="skill"
                              style={{ marginBottom: "10px" }}
                            >
                              {item}
                            </span>
                          ))}
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol>
                          <CLabel className="label">Salary</CLabel>
                        </CCol>
                      </CFormGroup>
                      <hr></hr>
                      <CFormGroup row>
                        <CCol
                          className="flex"
                          style={{ color: "#25a843", alignItems: "center" }}
                        >
                          <i className="cil-money mr-2"></i> {post.salary}
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol>
                          <CLabel className="label">Deadline</CLabel>
                        </CCol>
                      </CFormGroup>
                      <hr></hr>
                      <CFormGroup row>
                        <CCol
                          className="flex"
                          style={{ color: "red", alignItems: "center" }}
                        >
                          <i className="cil-clock mr-2"></i> {post.endTime}
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol>
                          <CLabel className="label">Description</CLabel>
                        </CCol>
                      </CFormGroup>
                      <hr></hr>
                      <CFormGroup row>
                        <CCol>
                          <pre>{post.description}</pre>
                        </CCol>
                      </CFormGroup>
                    </CContainer>
                  </CForm>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md="2"></CCol>
        </CRow>
      ) : (
        <CRow style={{ alignItems: "center", textAlign: "center" }}>
          <CCol xs="12" className="mb-4">
            <CCard className="no-cv">
              <CCardBody className="content">
                <div> Post Not Found 404!</div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </StyledCV>
  );
}

export default DetailPost;
