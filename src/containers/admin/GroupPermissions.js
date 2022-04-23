import React from "react";

import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader,
} from "@coreui/react";
import { getAuth } from "src/utils/helpers";
import GroupPermission from "src/components/grouppermissions/GroupPermission";

const GroupPermissions = () => {
  return (
    <CRow>
      <CCol xs="12" className="mb-4">
        <CCard className="card-content">
          {getAuth().role === "admin" ? (
            <>
              {" "}
              <CCardHeader>Permissions</CCardHeader>
              <CCardBody>
                <CTabs>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink>Moderator</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Company</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>ITer</CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent>
                    <CTabPane>
                      <GroupPermission role="moderator" />
                    </CTabPane>
                    <CTabPane>
                      <GroupPermission role="company" />
                    </CTabPane>
                    <CTabPane>
                      <GroupPermission role="iter" />
                    </CTabPane>
                  </CTabContent>
                </CTabs>
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
export default GroupPermissions;
