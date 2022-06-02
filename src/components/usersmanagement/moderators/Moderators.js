import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { listModerator } from "../../../redux/actions/listModerator";

import { useHistory } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInputGroup,
  CInputGroupText,
  CInput,
  CInputGroupPrepend,
  CInvalidFeedback,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { addMod } from "../../../redux/actions/addMod";
import { deleteMod } from "../../../redux/actions/deleteMod";
import { getAuth } from "src/utils/helpers";

const Moderators = () => {
  const [moderators, setModerators] = useState([]);
  const storeListModerator = useSelector((store) => store.listModerator);
  const storeAddModerator = useSelector((store) => store.addMod);
  const storeDelModerator = useSelector((store) => store.deleteMod);

  const loadingList = storeListModerator.loading;
  const loadingAdd = storeAddModerator.loading;
  const loadingDel = storeDelModerator.loading;

  const history = useHistory();

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  const take = 10; // rows in table
  const [success, setSuccess] = useState(0);

  const role = "moderator";
  useEffect(() => {
    listModerator(page, (item) => {
      setModerators(item.data.result);
      setNumPages(item.data.numPages);
      setPage(item.data.page);
    });
  }, [page, success]);

  const pageChange = (newPage) => {
    listModerator(newPage, (data) => {
      setModerators(data.data.result);
      setNumPages(data.data.numPages);
      setCurrentPage(data.data.page);
    });
  };
  const [primary, setPrimary] = useState(false);

  // const loading = useSelector((store) => store.addMod.loading);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const mod = {
      userName,
      password,
    };
    let isValid = true;

    if (userName === "" || password === "" || password !== confirmPassword) {
      isValid = false;
    }
    if (isValid) {
      addMod(mod, (data) => {
        if (data.status === 200) {
          setSuccess(success + 1);
          document.getElementById("form").reset();
          setUserName("");
          setPassword("");
          setConfirmPassword("");
          toast.success("Create Mod Successfully !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("Create Mod Unsuccessfully !", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      });
      setPrimary(!primary);
    } else {
      if (userName === "" || password === "") {
        toast.error("Please enter the empty input !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.error("Please make sure your passwords match!", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard className="card-content">
          {getAuth().role === "admin" ? (
            <>
              <CCardHeader>
                MODERATORS
                <CButton
                  style={{ float: "right", backgroundColor: "#4da6ff", borderColor: "#4da6ff"}}
                  color="primary"
                  className="mr-1 right-btn"
                  onClick={() => setPrimary(!primary)}
                  disabled={loadingAdd}
                >
                  <i className="cil-user-plus"></i> New Moderator
                </CButton>
                <CModal
                  show={primary}
                  onClose={() => setPrimary(!primary)}
                  color="primary"
                  style={{borderColor: "#4da6ff"}}
                >
                  <CModalHeader style= {{backgroundColor: "#4da6ff"}} closeButton>
                    <CModalTitle >New moderator</CModalTitle>
                  </CModalHeader>
                  <CModalBody
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <CForm
                      style={{ width: "400px" }}
                      id="form"
                      action=""
                      method="post"
                      className="form-horizontal was-validated mt-2"
                    >
                      <CFormGroup>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            id="username"
                            name="username"
                            placeholder="Username"
                            onChange={(event) =>
                              setUserName(event.target.value)
                            }
                            required
                          />
                          <CInvalidFeedback className="help-block ml-5">
                            Enter a username
                          </CInvalidFeedback>
                        </CInputGroup>
                      </CFormGroup>
                      <CFormGroup>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-asterisk" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            required
                          />
                          <CInvalidFeedback className="help-block ml-5">
                            Enter a password
                          </CInvalidFeedback>
                        </CInputGroup>
                      </CFormGroup>
                      <CFormGroup>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-asterisk" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="Confirm password"
                            onChange={(event) => {
                              setConfirmPassword(event.target.value);
                              if (event.target.value !== password) {
                                setError("Passwords do not match!");
                              } else {
                                setError("");
                              }
                            }}
                            required
                          />
                          <CInvalidFeedback className="help-block ml-5">
                            Enter a confirm password
                          </CInvalidFeedback>
                        </CInputGroup>
                      </CFormGroup>
                      <CFormGroup
                        style={{ textAlign: "center", marginBottom: "0" }}
                      >
                        <span style={{ color: "#e55353", fontSize: "80%" }}>
                          {error}
                        </span>
                      </CFormGroup>
                    </CForm>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                     
                      disabled={!userName || !password || !confirmPassword}
                      onClick={handleSubmit}
                      style= {{backgroundColor: "#4da6ff", borderColor: "#4da6ff"}}
                    >
                      Create
                    </CButton>{" "}
                    <CButton
                      color="danger"
                      onClick={() => {
                        setPrimary(!primary);
                        setUserName("");
                        setPassword("");
                        setConfirmPassword("");
                        document.getElementById("form").reset();
                      }}
                    >
                      Cancel
                    </CButton>
                  </CModalFooter>
                </CModal>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  
                  items={moderators}
                  fields={[
                    { key: "_id", _classes: "font-weight-bold" },
                    "userName",
                    "createdAt",
                    "Actions",
                  ]}
                  hover
                  loading={loadingList || loadingAdd || loadingDel}
                  striped
                  itemsPerPage={take}
                  activePage={page}
                  scopedSlots={{
                    createdAt: (item) => (
                      <td>
                        {String(new Date(item.createdAt).getDate()).padStart(
                          2,
                          "0"
                        ) +
                          "/" +
                          String(
                            new Date(item.createdAt).getMonth() + 1
                          ).padStart(2, "0") +
                          "/" +
                          new Date(item.createdAt).getFullYear()}
                      </td>
                    ),
                    Actions: (item) => (
                      <td>
                        <CTooltip
                          content="delete this moderator"
                          placement="bottom-start"
                        >
                          <CButton
                            color="danger"
                            // disabled={item.status}
                            onClick={() => {
                              deleteMod(item._id, (data) => {
                                if (data.status === 200) {
                                  toast.success("Delete Mod Successfully !", {
                                    position: toast.POSITION.BOTTOM_LEFT,
                                  });
                                  setModerators(
                                    moderators.filter(
                                      (itemMod) => itemMod._id !== item._id
                                    )
                                  );
                                } else {
                                  toast.error("Failed to delete," + data.msg, {
                                    position: toast.POSITION.BOTTOM_LEFT,
                                  });
                                }
                              });
                            }}
                          >
                            <i className="cil-x"></i>
                          </CButton>
                        </CTooltip>{" "}
                        <CTooltip
                          content="set permissions"
                          placement="bottom-start"
                        >
                          <CButton
                            color="success"
                            onClick={() =>
                              history.push(
                                `/usersmanagement/${role}/${item._id}/${item.userName}`
                              )
                            }
                          >
                            <i className="cil-cog"></i>
                          </CButton>
                        </CTooltip>
                      </td>
                    ),
                  }}
                />
                <CPagination
                  activePage={currentPage}
                  onActivePageChange={pageChange}
                  pages={numPages}
                  doubleArrows={false}
                  align="center"
                  
                />
              </CCardBody>
            </>
          ) : (
            <CCardBody className="center-admin">
              <div style={{ fontSize: "x-large" }}>
                You don't have permission to control this management!{" "}
              </div>
            </CCardBody>
          )}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Moderators;
