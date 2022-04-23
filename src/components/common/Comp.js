import React from "react";
import styled from "styled-components";
import { CCard, CCardBody, CLink } from "@coreui/react";
import defaultImage from "../../assets/images/default_image.png";

const StyledComp = styled.section`
  .card {
    width: 400px;
    margin: 10px;
    text-align: center;
    align-items: center;
    border-left:4px solid #d9d2c5;
    border-bottom:2px solid #d9d2c5;
  }
  .center-comp {
    align-items: center;
  }
  .align {
    margin: 10px;
    margin-top: 5px;
  }
  .image {
    width: 110px;
    height: 110px;
  }
  .info {
    margin: 0px 10px;
    width: 100%;
  }
`;

function Comp({ compName, address, image, recruitingPost, compId }) {
  return (
    <StyledComp>
      <CCard className="card">
        <CCardBody
          className="flex center-comp"
          style={{ flexDirection: "column" }}
        >
          <div className="image">
            {" "}
            <img
              src={image ? image : defaultImage}
              className="image"
              alt="avatar"
            />
          </div>
          <h4 className="mt-4 text--secondary text--large">{compName || ""}</h4>
          <div className="flex  margin-top">
            <CLink
              className="mr-2"
              to={`/posts/company/${compId}`}
              target="_blank"
              params={{ companyId: compId }}
            >
             <span className="text--primary text--underline"> {recruitingPost + " jobs"}</span>
            </CLink>

            <p className="ml-2">
              <i className="cil-location-pin"></i>
              {address || "Address"}
            </p>
          </div>
        </CCardBody>
      </CCard>
    </StyledComp>
  );
}

export default Comp;
