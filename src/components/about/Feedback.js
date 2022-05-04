import { CButton, CForm, CInputGroup, CTextarea } from "@coreui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { getAuth } from "src/utils/helpers";

import { createFeedback } from "src/redux/actions/createFeedback";
import image from "../../assets/images/feedback2.jpg";
import { useHistory } from "react-router";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";
function Feedback() {
  const history = useHistory();
  const storeFeedback = useSelector((store) => store.createFeedback);
  const loading = storeFeedback.loading;
  const [content, setContent] = useState("");

  const sendFeedback = (event) => {
    event.preventDefault();
    if (!getAuth().token) {
      toast.warn("Login to send your feedback!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      history.push("/login");
    } else {
      const data = {
        content,
      };

      createFeedback(data, (result) => {
        if (result.status === 200) {
          toast.success("Send feedback successfully!", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          document.getElementById("feedback").reset();
          setContent("");
        } else {
          toast.error("Fail!" + data.msg, {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      });
    }
  };
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
      <section className="feedback">
        <div className="ds-primary feedback__inner">
          {/* <div className="fb-img">
            <img src={image} alt="" width="600px" />
          </div> */}
          <div className="feedback__text text-center" style={{ width: "100%" }}>
            <h2 className="h2">
              Give us your <span className="skyblue">feedback!</span>
            </h2>

            <CForm id="feedback">
              <CInputGroup
                className="input-prepend"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <CTextarea
                  style={{ width: "100%", marginBottom: "10px" }}
                  rows="5"
                  placeholder="Content"
                  onChange={(event) => setContent(event.target.value)}
                />
                <div>
                  {" "}
                  <CButton
                    color="primary"
                    onClick={sendFeedback}
                    disabled={!content}
                    style={{
                      width: "10rem",
                      height: "2.5rem",
                      fontSize: "1.2rem",
                      borderRadius: "20px",
                    }}
                  >
                    Send
                  </CButton>
                </div>
              </CInputGroup>
            </CForm>
          </div>
        </div>
      </section>
    </LoadingOverlay>
  );
}

export default Feedback;
