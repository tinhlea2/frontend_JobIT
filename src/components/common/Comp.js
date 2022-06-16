import React from "react";
import styled from "styled-components";
import { CCard, CCardBody, CLink } from "@coreui/react";
import defaultImage from "../../assets/images/default_image.png";

const StyledComp = styled.section`
  flex: 0 0 48%;
  margin-right: 4%;
  :nth-child(2n) {
    margin-right: 0;
  }
  .card {
    margin: 40px;
    text-align: center;
    align-items: center;
    border: none;
    border-radius: 20px;
  }

  .center-comp {
    align-items: center;
    width: 100%;
    height: 25vh;
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
        <CCardBody className="flex center-comp" style={{ padding: "2rem" }}>
          <div className="image">
            {" "}
            <img
              src={image ? image : defaultImage}
              className="image"
              alt="avatar"
              style={{ width: "auto", borderRadius: "10px" }}
            />
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <h4
              className="text--secondary text--large"
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <i class="cil-building mr-2"></i>
              {compName || ""}
            </h4>
            <p
              className="mt-2"
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <i class="cil-magnifying-glass mr-2"></i>
              Hiring:
              <CLink
                className="mr-2"
                to={`/posts/company/${compId}`}
                params={{ companyId: compId }}
              >
                <span className=" ml-2" style={{ color: "#ff754d" }}>
                  {" "}
                  {Number(recruitingPost) > 1
                    ? `${recruitingPost || 0} jobs`
                    : `${recruitingPost || 0} job`}
                </span>
              </CLink>
            </p>
            <p
              className="mt-2"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <i className="cil-location-pin mr-2"></i>
              {address || "No Address"}
            </p>
          </div>
        </CCardBody>
      </CCard>
    </StyledComp>
  );
}

export default Comp;
