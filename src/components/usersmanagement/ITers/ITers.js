import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { listITer } from "../../../redux/actions/listITer";
import { toast } from "react-toastify";
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
  CTooltip,
} from "@coreui/react";

import { deleteITer } from "../../../redux/actions/deleteITer";
import { getAuth } from "src/utils/helpers";

const ITers = () => {
  const [iters, setITers] = useState([]);
  const storeListITer = useSelector((store) => store.listITer);
  const storeDelITer = useSelector((store) => store.deleteITer);

  const loadingList = storeListITer.loading;
  const loadingDel = storeDelITer.loading;

  const history = useHistory();

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [numPages, setNumPages] = useState(1);
  const take = 10; // rows in table

  const role = "iter";
  useEffect(() => {
    listITer(page, (item) => {
      setITers(item.data.result);
      setNumPages(item.data.numPages);
      setPage(item.data.page);
    });
  }, [page]);

  const pageChange = (newPage) => {
    listITer(newPage, (data) => {
      setITers(data.data.result);
      setNumPages(data.data.numPages);
      setCurrentPage(data.data.page);
    });
  };

  return (
    <CRow>
      <CCol xl={6}>
        <CCard className="card-content">
          {getAuth().role === "admin" ? (
            <>
              {" "}
              <CCardHeader>ITers</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={iters}
                  fields={[
                    { key: "_id", _classes: "font-weight-bold" },
                    "name",
                    "createdAt",
                    "Actions",
                  ]}
                  hover
                  loading={loadingList || loadingDel}
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
                          content="delete this ITer"
                          placement="bottom-start"
                        >
                          <CButton
                            color="danger"
                            onClick={() => {
                              deleteITer(item._id, (data) => {
                                if (data.status === 200) {
                                  toast.success("Delete ITer Successfully !", {
                                    position: toast.POSITION.BOTTOM_LEFT,
                                  });
                                  setITers(
                                    iters.filter(
                                      (itemITer) => itemITer._id !== item._id
                                    )
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
                        <CTooltip
                          content="set permissions"
                          placement="bottom-start"
                        >
                          <CButton
                            color="success"
                            onClick={() =>
                              history.push(
                                `/usersmanagement/${role}/${item.accountId}/${item.name}`
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

export default ITers;
