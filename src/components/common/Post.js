import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getAuth } from "src/utils/helpers";
import { toast } from "react-toastify";
import { apply } from "../../redux/actions/apply";
import defaultImage from "../../assets/images/default_image.png";

import {
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CFormGroup,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CLabel,
  CModalFooter,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector } from "react-redux";
// import LoadingOverlay from "react-loading-overlay";

const StyledPost = styled.section`
  .label {
    font-weight: 800;
    color: #4da6ff;
    font-size: 15px;
  }

  .card {
    width: 610px;
    margin: 10px;
  }
  .align {
    margin: 10px;
    margin-top: 5px;
  }
  .card--footer {
    margin-top: 8px;
  }
  .image {
    width: 110px;
    height: 110px;
  }
  .info {
    margin: 0px 10px;
    width: 100%;
  }
  .button {
    background-color: white;
    color: green;
  }
  .ellipsis-text {
    display: inline-block;
    max-width: 300px;
  }
  .notify {
    color: gray;
    font-weight: lighter;
    font-style: italic;
  }
  .job-title {
    font-size: 20px;
  }
  .header {
    order-bottom: 0;
  }
`;

function Post({
  compName,
  title,
  address,
  skill,
  endTime,
  salary,
  image,
  description,
  auth,
  postId,
  compId,
  isApplied,
}) {
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  const storeApply = useSelector((store) => store.apply);
  const loading = storeApply.loading;
  return (
    // <LoadingOverlay
    //   active={loading}
    //   spinner
    //   text="Loading..."
    //   style={{
    //     position: "fixed",
    //     width: "100%",
    //     height: "100%",
    //     zIndex: "9999",
    //   }}
    // >
    <StyledPost>
      <CCard style={{ width: "500px" }} className="card job-container-item">
        <h2 className="job-title ellipsis-text text-truncate mb-3">{title}</h2>
        {isApplied && (
          <div className="card-header-actions">
            <span className=" notify float-right">
              {" "}
              <CIcon name="cil-check" className="mr-2" />
              You applied this job!
            </span>
          </div>
        )}
        <CCardBody className="flex space-between">
          <div className="image">
            {" "}
            <img
              src={image ? image : defaultImage}
              className="image"
              alt="avatar"
            />
          </div>

          <div className="info">
            <div className="flex space-between align-item">
              <h4 className="text--primary">{compName}</h4>
            </div>
            <p>
              <i className="cil-location-pin"></i>
              {address}
            </p>
            <p className="ellipsis-text  text-truncate">
              <i className="cil-code"></i>
              {" " + skill}
            </p>
            <p className="flex items-center">
              <i className="cil-money mr-1"></i>
              {getAuth().token ? (
                " " + salary
              ) : (
                <a href="#/login" style={{ color: "#9c9595" }}>
                  {" "}
                  Login to view salary
                </a>
              )}
            </p>
            <p className="flex items-center">
              <i className="cil-history mr-1"></i>
              {" " + endTime}
            </p>
            <div
              className="flex space-between card--footer"
              style={{ justifyContent: "flex-end" }}
            >
              <CLink onClick={() => setOpen(!isOpen)}>
                <span
                  className="btn--secondary"
                  style={{
                    backgroundColor: "#4da6ff",
                    color: "white",
                  }}
                >
                  See More
                </span>
              </CLink>
            </div>
          </div>
          <CModal
            show={isOpen}
            onClose={() => setOpen(!isOpen)}
            //color="success"
          >
            <CModalHeader
              closeButton
              style={{
                backgroundColor: "#4da6ff",
                color: "white",
              }}
            >
              <CModalTitle>{title}</CModalTitle>
              
            </CModalHeader>
            <CModalBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel className="label">
                      <i className="cil-people"></i> Company
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <span> {compName}</span>
                  </CCol>
                </CFormGroup>
                <hr></hr>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel className="label">
                      <i className="cil-code"></i> Languages /Skills
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <span> {skill}</span>
                  </CCol>
                </CFormGroup>
                <hr></hr>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel className="label">
                      <i className="cil-money"></i> Salary
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <span> {salary}</span>
                  </CCol>
                </CFormGroup>
                <hr></hr>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel className="label">
                      <i className="cil-location-pin"></i> Address
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <span>{address}</span>
                  </CCol>
                </CFormGroup>
                <hr></hr>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel className="label">
                      <i className="cil-clock"></i> Deadline
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <span>{endTime}</span>
                  </CCol>
                </CFormGroup>
                <hr></hr>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel className="label">
                      <i className="cil-description"></i> Descriptions
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <pre>{description}</pre>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton
                disabled={loading}
                color="success"
                onClick={() => {
                  if (!getAuth().token) {
                    history.push("/login");
                  } else {
                    if (getAuth().role === "iter") {
                      apply(postId, (data) => {
                        if (data.status === 200) {
                          toast.success("Apply successfully !", {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        } else {
                          toast.error("Fail to apply! " + data.msg, {
                            position: toast.POSITION.BOTTOM_LEFT,
                          });
                        }
                        setOpen(!isOpen);
                      });
                    } else {
                      toast.warn("Only ITer can apply job! ", {
                        position: toast.POSITION.BOTTOM_LEFT,
                      });
                    }
                  }
                }}
                style={{
                  backgroundColor: "#4da6ff",
                  color: "white",
                }}
              >
                Apply Now
              </CButton>{" "}
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
    </StyledPost>
    // </LoadingOverlay>
  );
}

export default Post;
