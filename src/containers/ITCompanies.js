import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import BeatLoader from "react-spinners/BeatLoader";
// import ReactLoading from "react-loading";
import defaultImage from "../assets/images/default_image.png";
import { css } from "@emotion/react";
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
import { getCompany } from "src/redux/actions/getCompany";
import Comp from "src/components/common/Comp";
import notfound from "../assets/icons/not-found.png";

const ITCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const storeGetCompany = useSelector((store) => store.getCompany);
  const loadingList = storeGetCompany.loading;

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  // const take = 10; // rows in table

  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    getCompany(page, query, (item) => {
      setCompanies(item.data.result);

      setNumPages(item.data.numPages);
      setPage(item.data.page);
    });
  }, [page, query, reset]);

  const pageChange = (newPage) => {
    getCompany(newPage, query, (data) => {
      setCompanies(data.data.result);
      setNumPages(data.data.numPages);
      setCurrentPage(data.data.page);
    });
  };

  const handleChange = (event) => {
    if (event.target.value === "") {
      setReset(true);
      setCurrentPage(1);
      setQuery("");
    }
    setSearchInput(event.target.value);
  };

  const search = () => {
    setQuery(searchInput);
  };
  const overrideLoadingCSS = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <LoadingOverlay
      active={loadingList}
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
      <CContainer>
        <CRow style={{ justifyContent: "center" }}>
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
                placeholder="Searching for company"
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
              {/* <CInput
                size="16"
                type="text"
                placeholder="Company name"
                name="search"
                onChange={handleChange}
              />
              <CInputGroupAppend>
                <CButton
                  style={{ opacity: "1" }}
                  className="btn--primary"
                  onClick={search}
                  disabled={!searchInput}
                >
                  Search
                </CButton>
              </CInputGroupAppend> */}
            </CInputGroup>
          </CCol>
        </CRow>
        {/* {loadingList && <ReactLoading type="spinningBubbles" color="#321fdb" />} */}
        <div className="flex flex-wrap">
          {companies &&
            companies.map((item, index) => {
              return (
                <Comp
                  key={index}
                  compName={item.name}
                  address={item.address}
                  image={item.image ? item.image : defaultImage}
                  recruitingPost={item.recruitingPost}
                  compId={item.accountId}
                />
              );
            })}
          {!companies.length && (
            <CCard className="no-result">
              <i class="cil-rain" style={{ fontSize: "24px" }}></i>
              {/* <img src={notfound} alt=""></img> */}
              <div>So sorry! We couldn't find any results for your searching! </div>
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

export default ITCompanies;
