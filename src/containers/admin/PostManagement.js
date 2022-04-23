import React from "react";
import { ApprovingPost, ApprovedPost } from "../../components/postsmanagement";

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
} from "@coreui/react";

const GroupPermissions = () => {
  return (
    <CRow>
      <CCol xs="12" className="mb-4">
        <CCard className="card-content">
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>Approving Posts</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>Approved Posts</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane>
                  <ApprovingPost />
                </CTabPane>
                <CTabPane>
                  <ApprovedPost />
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
export default GroupPermissions;
