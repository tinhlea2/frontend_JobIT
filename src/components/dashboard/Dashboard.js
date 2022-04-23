import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CJumbotron,
  CRow,
} from "@coreui/react";
import React from "react";
import { getAuth } from "src/utils/helpers";

const Dashboard = () => {
  const role = getAuth().userName === "admin" ? "Admin" : "Moderator";
  return (
    <CRow>
      <CCol xs="12" className="mb-4">
        <CCard className="card-content">
          <CCardHeader style={{ fontSize: "x-large" }}>
            SYSTEM MANAGEMENT
          </CCardHeader>
          <CCardBody>
            <CJumbotron className="border">
              <h1 className="display-3">IT JOBS</h1>
              <hr className="my-2" />

              <p className="lead">
                <b>User name: </b> {getAuth().userName}
              </p>
              <hr className="my-2" />
              <p className="lead">
                <b>Role: </b> {role}
              </p>
              <hr className="my-2" />
            </CJumbotron>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
