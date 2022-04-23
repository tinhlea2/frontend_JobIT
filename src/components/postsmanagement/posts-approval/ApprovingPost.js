import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import _ from "lodash";
import { getUnacceptedPosts } from "../../../redux/actions/getUnacceptedPosts";
import { deletePost } from "../../../redux/actions/deletePost";
import { approvePost } from "../../../redux/actions/approvePost";
import { approveMultiPosts } from "../../../redux/actions/approveMultiPosts";
import { getPosts } from "../../../redux/actions/getPosts";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CInputCheckbox,
  CTooltip,
  CFormGroup,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CLabel,
  CModalFooter,
} from "@coreui/react";
import { setPostAdmin } from "src/redux/actions/setPostAdmin";

const StyleLabel = styled.section`
  .label {
    font-weight: 800;
    color: #321fdb;
  }
`;
const ApprovingPost = () => {
  const [posts, setPosts] = useState([]);
  const storeGetPosts = useSelector((store) => store.getPosts);
  const loadingList = storeGetPosts.loading;
  const storeDelPost = useSelector((store) => store.deletePost);
  const loadingDel = storeDelPost.loading;
  const storeApprovePost = useSelector((store) => store.approvePost);
  const loadingApprove = storeApprovePost.loading;
  const storeApproveMul = useSelector((store) => store.approveMultiPosts);
  const loadingApproveMul = storeApproveMul.loading;

  const [isOpen, setOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  const take = 10; // rows in table
  const [success, setSuccess] = useState(0);

  const [items, setItems] = useState([]);
  useEffect(() => {
    getUnacceptedPosts(page, (result) => {
      setPosts(result.posts);
      setNumPages(result.numPages);
      setPage(result.currentPage);
    });
  }, [page, success]);

  const pageChange = (newPage) => {
    getUnacceptedPosts(newPage, (data) => {
      setPosts(data.posts);
      setNumPages(data.numPages);
      setCurrentPage(data.currentPage);
    });
  };

  const [currentPost, setCurrentPost] = useState([{}]);

  const handleViewDetail = (id) => {
    const getPost = posts.filter((post) => post._id === id);
    setCurrentPost([{ ...getPost[0], skill: getPost[0].skill.join(", ") }]);
    setOpen(!isOpen);
  };

  const selectItem = (event) => {
    const id = event.target.value;
    const checkedValue = event.target.checked;

    if (checkedValue) {
      setItems([...items, id]);
    } else {
      setItems(items.filter((i) => i !== id));
    }
  };

  const selectAll = () => {
    const status =
      posts.filter(
        (post) => document.getElementById(post._id).checked === false
      ).length !== 0;

    if (status) {
      setItems(posts.map((i) => i._id));
      posts.forEach(
        (item) => (document.getElementById(item._id).checked = true)
      );
    } else {
      setItems([]);
      posts.forEach(
        (item) => (document.getElementById(item._id).checked = false)
      );
    }
  };

  const approveAll = () => {
    const selectedPosts = { listId: items };

    approveMultiPosts(selectedPosts, (data) => {
      if (data.status === 200) {
        setSuccess(success + 1);
        toast.success("Approve selected posts successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        // window.location.reload();
      } else {
        toast.error("Fail to approve ! " + data.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard>
          <CCardBody>
            <CDataTable
              items={posts}
              fields={[
                { key: "_id", _classes: "font-weight-bold" },
                "companyName",
                "title",
                "Actions",
                "More",
              ]}
              hover
              loading={
                loadingList || loadingDel || loadingApprove || loadingApproveMul
              }
              striped
              itemsPerPage={take}
              activePage={page}
              scopedSlots={{
                companyName: (item) => (
                  <td>{_.get(item.company[0], "name")}</td>
                ),
                Actions: (item) => (
                  <td md="4" className="py-4" key={"bottom-start"}>
                    <CTooltip
                      content="delete this post"
                      placement="bottom-start"
                    >
                      <CButton
                        color="danger"
                        onClick={() => {
                          deletePost(item._id, (data) => {
                            if (data.status === 200) {
                              toast.success("Delete post successfully !", {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                              setPosts(posts.filter((i) => i._id !== item._id));
                            } else if (data.status === 401) {
                              toast.warning(
                                "You are not allowed to do this action! ",
                                {
                                  position: toast.POSITION.BOTTOM_LEFT,
                                }
                              );
                            } else {
                              toast.error("Fail to delete! " + data.msg, {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                            }
                          });
                        }}
                      >
                        <i className="cil-trash"></i>
                      </CButton>
                    </CTooltip>{" "}
                    <CTooltip content="view details" placement="bottom-start">
                      <CButton
                        color="info"
                        onClick={() => handleViewDetail(item._id)}
                      >
                        <i className="cil-clipboard"></i>
                      </CButton>
                    </CTooltip>{" "}
                    <CTooltip
                      content="approve this post"
                      placement="bottom-start"
                    >
                      <CButton
                        color="success"
                        onClick={() => {
                          approvePost(item._id, (data) => {
                            if (data.status === 200) {
                              toast.success("Approve post successfully !", {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                              setPosts(posts.filter((i) => i._id !== item._id));
                              getPosts(1, "", (result) => {
                                setPostAdmin(result.data.numPages);
                              });
                            } else if (data.status === 401) {
                              toast.warning(
                                "You are not allowed to do this action! ",
                                {
                                  position: toast.POSITION.BOTTOM_LEFT,
                                }
                              );
                            } else {
                              toast.error("Fail to approve ! " + data.msg, {
                                position: toast.POSITION.BOTTOM_LEFT,
                              });
                            }
                          });
                        }}
                      >
                        <i className="cil-check"></i>
                      </CButton>
                    </CTooltip>
                  </td>
                ),
                More: (item) => (
                  <td>
                    <span style={{ visibility: "hidden" }}>BOX</span>
                    <CInputCheckbox
                      id={item._id}
                      name={item._id}
                      value={item._id}
                      onClick={selectItem}
                      defaultChecked={false}
                    ></CInputCheckbox>
                  </td>
                ),
              }}
            />
            <div className="flex flex-end">
              <CTooltip content="select all post" placement="bottom-start">
                <CButton color="secondary" className="mr-1" onClick={selectAll}>
                  <CInputCheckbox
                    style={{ visibility: "hidden" }}
                    name="checkAll"
                    value="checkAll"
                    onClick={selectAll}
                    defaultChecked={false}
                  ></CInputCheckbox>
                  All <i className="cil-task"></i>
                </CButton>
              </CTooltip>
              <CTooltip content="approve all post" placement="bottom-start">
                <CButton color="success" onClick={approveAll}>
                  <i className="cil-check"></i>
                </CButton>
              </CTooltip>
            </div>
            <CPagination
              activePage={currentPage}
              onActivePageChange={pageChange}
              pages={numPages}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
          <CModal
            show={isOpen}
            onClose={() => setOpen(!isOpen)}
            color="primary"
          >
            <CModalHeader closeButton>
              <CModalTitle>{currentPost[0]._id}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <StyleLabel>
                <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="label">Title</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <span>{currentPost[0].title}</span>
                    </CCol>
                  </CFormGroup>
                  <hr></hr>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="label">Skills</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <pre>{currentPost[0].skill}</pre>
                    </CCol>
                  </CFormGroup>
                  <hr></hr>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="label">Salary</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <span>{currentPost[0].salary}</span>
                    </CCol>
                  </CFormGroup>
                  <hr></hr>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="label">Address</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <span> {currentPost[0].address}</span>
                    </CCol>
                  </CFormGroup>
                  <hr></hr>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="label">End time</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <span>{currentPost[0].endTime}</span>
                    </CCol>
                  </CFormGroup>
                  <hr></hr>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="label">Description</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <pre> {currentPost[0].description}</pre>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </StyleLabel>
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
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ApprovingPost;
