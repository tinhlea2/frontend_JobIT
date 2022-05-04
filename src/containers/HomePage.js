import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPosts } from "src/redux/actions/getPosts";
import LoadingOverlay from "react-loading-overlay";
import _ from "lodash";

import {
  CRow,
  CCol,
  CPagination,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CButton,
  CContainer,
  CCard,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getAuth } from "src/utils/helpers";
import Post from "src/components/common/Post";
import notfound from "../assets/icons/not-found.png";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const storeGetPosts = useSelector((store) => store.getPosts);
  const loadingList = storeGetPosts.loading;

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  // const take = 10; // rows in table

  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    getPosts(page, query, (item) => {
      setPosts(item.data.posts);
      setNumPages(item.data.numPages);
      setPage(item.data.currentPage);
    });
  }, [page, query, reset]);

  const pageChange = (newPage) => {
    getPosts(newPage, query, (data) => {
      setPosts(data.data.posts);
      setNumPages(data.data.numPages);
      setCurrentPage(data.data.currentPage);
    });
  };

  const handleChange = (event) => {
    if (event.target.value === "") {
      setReset(true);
      setQuery("");
    }
    setSearchInput(event.target.value);
  };

  const search = () => {
    setQuery(searchInput);
  };
  return (
    <LoadingOverlay
      active={loadingList}
      spinner
      text="Loading..."
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "9999",
      }}
    >
      <CContainer>
        <CRow>
          <CCol md="6" className="mb-4">
            <CInputGroup className="input-prepend mt-4">
              {/* <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-magnifying-glass" />
                </CInputGroupText>
              </CInputGroupPrepend> */}
              <CInput
                size="16"
                type="text"
                style={{
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                }}
                placeholder="Searching for skill, Company, Position"
                name="search"
                onChange={handleChange}
              />
              <CInputGroupAppend>
                <CButton
                  style={{
                    opacity: "1",
                    display: "flex",
                    alignItems: "center",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                  className="btn--primary"
                  onClick={search}
                  disabled={!searchInput}
                >
                  <i class="cil-search mr-1"></i> Search
                </CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </CCol>
        </CRow>
        <div className="flex flex-wrap space-between">
          {posts &&
            posts.map((item, index) => {
              return (
                <Post
                  key={index}
                  compName={_.get(item.company[0], "name")}
                  title={item.title}
                  address={item.address}
                  skill={item.skill.join(", ")}
                  endTime={item.endTime}
                  salary={item.salary}
                  image={_.get(item.company[0], "image")}
                  auth={getAuth}
                  postId={item._id}
                  compId={item.companyId}
                  description={item.description}
                  isApplied={item.apply.some(
                    (i) => i.iterId === getAuth().userId
                  )}
                />
              );
            })}
          {!posts.length && (
            <CCard className="no-result">
              {" "}
              <img src={notfound} alt=""></img>
              <div>Sorry, we couldn't find any results for your search! </div>
            </CCard>
          )}
        </div>

        <CPagination
          className="mb-2 page--paddingTop page--paddingBottom"
          activePage={currentPage}
          onActivePageChange={pageChange}
          pages={numPages}
          doubleArrows={false}
          align="center"
        />
      </CContainer>
    </LoadingOverlay>
  );
};

export default HomePage;
