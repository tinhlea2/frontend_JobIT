import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CTooltip,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";
import { getAppliedJobs } from "src/redux/actions/getAppliedJobs";
import _ from "lodash";

const AppliedJobs = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const loading = useSelector((store) => store.getAppliedJobs.loading);

  useEffect(() => {
    getAppliedJobs((result) => {
      if (_.size(_.get(result, "posts")) <= 0) {
        return;
      }
      setPosts(_.get(result, "posts"));
    });
  }, []);

  return (
    <LoadingOverlay
      active={loading}
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
        <CCol xs="12" className="mb-4">
          <CCard className="card-content">
            <div
              className="job-title ellipsis-text"
              style={{ fontSize: "20px", color: "#ff0058", padding: "15px" }}
            >
              History about your applied jobs
            </div>
            <CCardBody>
              {posts.length > 0 ? (
                <div>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Post Name</th>
                        <th>Status</th>
                        <th>Job Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post, index) => {
                        // let date = new Date(post.timeApply);
                        // let dd = String(date.getDate()).padStart(2, "0");
                        // let mm = String(date.getMonth() + 1).padStart(2, "0");
                        // let yyyy = date.getFullYear();
                        // let day = dd + "/" + mm + "/" + yyyy;
                        let status =
                          _.get(post, "status") === "pending"
                            ? "info"
                            : _.get(post, "status") === "pending"
                            ? "success"
                            : "warning";
                        return (
                          <tr key={_.get(post, "_id")}>
                            <td>{++index}</td>
                            <td>{_.get(post, "name")}</td>
                            <td>{_.get(post, "title")}</td>
                            <td>
                              <CBadge
                                style={{
                                  padding: "6px 12px 4px",
                                  letterSpacing: 2,
                                  borderRadius: 16,
                                }}
                                color={status}
                              >
                                {_.get(post, "status").toUpperCase()}
                              </CBadge>
                            </td>
                            <td>
                              <CTooltip
                                content="view post"
                                placement="bottom-start"
                              >
                                <CLink
                                  className="mr-2"
                                  to={`/posts/${_.get(post, "_id")}`}
                                  target="_blank"
                                  params={{ id: _.get(post, "_id") }}
                                >
                                  <CBadge
                                    style={{
                                      padding: "8px 10px 6px",
                                      letterSpacing: 2,
                                      cursor: "pointer",
                                    }}
                                    color="success"
                                  >
                                    <i
                                      className="cil-description"
                                      style={{
                                        fontSize: 16,
                                      }}
                                    ></i>
                                  </CBadge>
                                  {/* <span className="text--primary text--underline"> {recruitingPost + " jobs"}</span> */}
                                </CLink>
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
                  <h4>
                    You have 0 Applied Jobs Oops! <br />
                    You haven't applied for any jobs yet.
                  </h4>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </LoadingOverlay>
  );
};

export default AppliedJobs;
