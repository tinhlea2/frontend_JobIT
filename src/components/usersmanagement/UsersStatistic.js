import { CCardGroup, CWidgetProgressIcon } from "@coreui/react";
import React, { useEffect, useState } from "react";
import office from "../../assets/icons/office.svg";
import candidate from "../../assets/icons/candidate.svg";
import LoadingOverlay from "react-loading-overlay";

import { analyzeUser } from "src/redux/actions/analyzeUser";
import { useSelector } from "react-redux";
const UsersStatistic = () => {
  const storeStatistic = useSelector((store) => store.analyzeUser);
  const loading = storeStatistic.loading;

  const [iter, setITer] = useState(0);
  const [comp, setComp] = useState(0);

  useEffect(() => {
    analyzeUser((result) => {
      if (result.status === 200) {
        setITer(result.data.numberOfIter);
        setComp(result.data.numberOfCompany);
      }
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
      <CCardGroup className="user-statistic">
        <CWidgetProgressIcon
          header={comp}
          text="Companies"
          color="gradient-info"
        >
          <img src={office} alt="" width="100px" height="100px" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon header={iter} text="ITers" color="gradient-info">
          <img src={candidate} alt="" width="100px" height="100px" />
        </CWidgetProgressIcon>
      </CCardGroup>
    </LoadingOverlay>
  );
};

export default UsersStatistic;
