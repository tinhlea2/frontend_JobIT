import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormGroup,
  CInputRadio,
  CLabel,
  CButton,
  CDataTable,
} from "@coreui/react";
import { listUserPermissions } from "../../redux/actions/listUserPermissions";
import { updateUserPermissions } from "../../redux/actions/updateUserPermissions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UserPermissions = ({ match }) => {
  const history  = useHistory()
  const [userPermissions, setUserPermissions] = useState([]);

  const storeList = useSelector((store) => store.listUserPermissions);
  const storeUpdate = useSelector((store) => store.updateUserPermissions);

  const loadingList = storeList.loading;
  const loadingUpdate = storeUpdate.loading;

  useEffect(() => {
    listUserPermissions(match.params.id, (result) => {
      setUserPermissions(result.permissions.filter(item =>item?.permissionName !== undefined));
    });
  }, [match.params.id]);

  const updatedPermissions = JSON.parse(JSON.stringify(userPermissions));
  const data = {
    permissions: updatedPermissions,
  };

  const updateUserPermissionsHandler = (event) => {
    event.preventDefault();
    setUserPermissions(updatedPermissions);
    updateUserPermissions(match.params.id, data, (data) => {
      if (data.status === 200) {
        toast.success("Update permissions successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.error("Fail to delete! " + data.msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    });
  };

  const cancelUpdatedPermissionsHandler = () => {
    history.back();
  };

  const changePermissions = (event) => {
    const id = event.target.value.slice(0, -1);

    const value = event.target.value.slice(-1);
    const checkedValue = value === "n" ? false : true;

    updatedPermissions.map(
      (item) => (item.check = item._id === id ? checkedValue : item.check)
    );
  };

  return (
    <CRow>
      <CCol>
        <CCard className="card-content">
          <CCardHeader>
            <p>User ID: {match.params.id}</p>
            {match.params.role === "moderator" && <label>Username:</label>}
            {match.params.role === "iter" && <label>Full name: </label>}
            {match.params.role === "company" && <label>Company name:</label>}
            <span> {match.params.name}</span>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={userPermissions}
              fields={["PERMISSIONS", "OPTIONS"]}
              hover
              loading={loadingList || loadingUpdate}
              striped
              itemsPerPage={userPermissions.length}
              scopedSlots={{
                PERMISSIONS: (item) => <td>{item.permissionName}</td>,
                OPTIONS: (permission) => (
                  <td>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id={permission._id + "y"}
                        name={permission._id + "name"}
                        value={permission._id + "y"}
                        defaultChecked={permission.check}
                        onChange={changePermissions}
                      />
                      <CLabel
                        variant="custom-checkbox"
                        htmlFor={permission._id + "y"}
                      >
                        Yes
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id={permission._id + "n"}
                        name={permission._id + "name"}
                        value={permission._id + "n"}
                        defaultChecked={!permission.check}
                        onChange={changePermissions}
                      />
                      <CLabel
                        variant="custom-checkbox"
                        htmlFor={permission._id + "n"}
                      >
                        No
                      </CLabel>
                    </CFormGroup>
                  </td>
                ),
              }}
            />
          </CCardBody>
          <div className="flex flex-end">
            <CButton
              color="primary"
              className="mr-1 right-btn"
              onClick={updateUserPermissionsHandler}
            >
              Save
            </CButton>
            {/* <CButton
              color="warning"
              className="mr-1 right-btn"
              onClick={cancelUpdatedPermissionsHandler}
            >
              Cancel
            </CButton> */}
          </div>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UserPermissions;
