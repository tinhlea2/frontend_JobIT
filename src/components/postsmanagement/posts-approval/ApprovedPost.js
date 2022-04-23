import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPosts } from "../../../redux/actions/getPosts";
import { deletePost } from "../../../redux/actions/deletePost";
import _ from "lodash";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CTooltip,
} from "@coreui/react";
const ApprovedPost = () => {
  const [posts, setPosts] = useState([]);
  const storeGetPosts = useSelector((store) => store.getPosts);
  const loadingList = storeGetPosts.loading;
  const storeDelPost = useSelector((store) => store.deletePost);
  const loadingDel = storeDelPost.loading;
  const storeReload = useSelector((state) => state.setPostAdmin);

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  const take = 10; // rows in table
  const query = "";
  useEffect(() => {
    getPosts(page, query, (result) => {
      setPosts(result.data.posts);
      setNumPages(result.data.numPages);
      setPage(result.data.currentPage);
    });
  }, [page, storeReload]);

  const pageChange = (newPage) => {
    getPosts(newPage, query, (data) => {
      setPosts(data.data.posts);
      setNumPages(data.data.numPages);
      setCurrentPage(data.data.currentPage);
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
              ]}
              hover
              loading={loadingList || loadingDel}
              striped
              itemsPerPage={take}
              activePage={page}
              scopedSlots={{
                companyName: (item) => (
                  <td>{_.get(item.company[0], "name")}</td>
                ),
                Actions: (item) => (
                  <td>
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
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ApprovedPost;
