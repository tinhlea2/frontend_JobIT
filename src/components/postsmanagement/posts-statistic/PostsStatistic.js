import {
  CCardBody,
  CCol,
  CFormGroup,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";

import { Pie, Line } from "react-chartjs-2";
import { analyzePost } from "src/redux/actions/analyzePost";
import { analyzeSkill } from "src/redux/actions/analyzeSkill";
import LoadingOverlay from "react-loading-overlay";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import nodata from "../../../assets/icons/emoji.svg";
import { useSelector } from "react-redux";
const PostsStatistic = () => {
  const loading = useSelector((store) => store.analyzePost.loading);
  const loadingSkill = useSelector((store) => store.analyzeSkill.loading);

  const [option, setOption] = useState("year");
  const [isData, setIsData] = useState(false);
  const [isDataSkill, setIsDataSkill] = useState(false);

  const [postData, setPostData] = useState({});
  const [skillData, setSkillData] = useState({});

  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState("");
  const months = [];
  for (let i = 0; i < currentMonth; i++) {
    months.push(currentMonth - i);
  }

  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [yearSkill, setYearSkill] = useState(currentYear);

  const years = [];
  for (let i = 0; i <= 10; i++) {
    years.push(currentYear - i);
  }
  useEffect(() => {
    analyzePost(year, (result) => {
      if (
        result.status === 200 &&
        !result.data.every((val, i, arr) => val === arr[0])
      ) {
        setIsData(true);
        setPostData({
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
          ],
          datasets: [
            {
              label: "Number of Posts",
              data: result.data,
              fill: false,
              backgroundColor: "rgb(255, 0, 0)",
              borderColor: "rgba(255, 0, 0, 1)",
            },
          ],
        });
      } else {
        setIsData(false);
      }
    });
  }, [year, isData]);

  useEffect(() => {
    analyzeSkill(option, yearSkill, month, (result) => {
      if (result.status === 200 && result.data.length > 0) {
        setIsDataSkill(true);
        let label = result.data.map((e) => Object.keys(e)[0]);

        let data = result.data.map((e) => e[Object.keys(e)[0]]);

        setSkillData({
          labels: label,
          datasets: [
            {
              label: " of Posts",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(105, 159, 64, 0.2)",

                "rgba(255, 69, 0, 0.2)",
                "rgba(151, 255, 255, 0.2)",
                "rgba(238, 180, 34, 0.2)",
                "rgba(240, 128, 128, 0.2)",
                "rgba(205, 205, 180, 0.2)",
                "rgba(60, 19, 213, 0.2)",
                "rgba(0, 206, 209, 0.2)",

                "rgba(25, 99, 152, 0.2)",
                "rgba(254, 162, 235, 0.2)",
                "rgba(155, 206, 86, 0.2)",
                "rgba(175, 192, 192, 0.2)",
                "rgba(132, 202, 205, 0.2)",
                "rgba(155, 109, 64, 0.2)",
                "rgba(105, 159, 164, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(105, 159, 64, 1)",

                "rgba(255, 69, 0, 1)",
                "rgba(151, 255, 255, 1)",
                "rgba(238, 180, 34, 1)",
                "rgba(240, 128, 128, 1)",
                "rgba(205, 205, 180, 1)",
                "rgba(60, 19, 213, 1)",
                "rgba(0, 206, 209, 1)",

                "rgba(25, 99, 152, 1)",
                "rgba(254, 162, 235, 1)",
                "rgba(155, 206, 86, 1)",
                "rgba(175, 192, 192, 1)",
                "rgba(132, 202, 205, 1)",
                "rgba(155, 109, 64, 1)",
                "rgba(105, 159, 164, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } else {
        setIsDataSkill(false);
      }
    });
  }, [yearSkill, month, option, isDataSkill]);

  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Month",
          color: "blue",
          font: {
            size: 20,
            weight: "bold",
            lineHeight: 1.2,
          },
          padding: { top: 10, left: 0, right: 0, bottom: 0 },
        },
      },
      y: {
        min: 0,
        display: true,
        title: {
          display: true,
          text: "Post",
          color: "blue",
          font: {
            size: 20,
            weight: "bold",
            lineHeight: 1.2,
          },
          padding: { top: 10, left: 0, right: 0, bottom: 0 },
        },
      },
    },
  };

  const overrideLoadingCSS = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <LoadingOverlay
      active={loading || loadingSkill}
      spinner={
        <BeatLoader css={overrideLoadingCSS} color="rgb(77, 166, 255)" />
      }
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgb(172 165 165 / 50%)",
        }),
      }}
    >
      <CCardBody className="statistic">
        <div style={{ height: "180px" }}>
          <h1 className="title">Post Chart</h1>
          <CRow>
            <CCol xs="4">
              <CFormGroup className="year-select">
                <CLabel className="mr-2" htmlFor="ccyear">
                  Year:
                </CLabel>

                <CSelect
                  custom
                  name="ccyear"
                  id="ccyear"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                >
                  {years.map((y) => (
                    <option>{y}</option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
        </div>
        {isData ? (
          <Line data={postData} options={options} />
        ) : (
          <div style={{ height: "250px" }}>
            {" "}
            <img src={nodata} alt="" width="100px" />
            <h1 style={{ textAlign: "center", fontSize: "30px" }}>No data </h1>
          </div>
        )}
        <div style={{ height: "180px" }}>
          <h1 className="title">Skill Chart </h1>

          <CRow>
            <CCol xs="6">
              <CFormGroup className="year-select">
                <CLabel className="mr-2" htmlFor="ccyear">
                  Year:
                </CLabel>

                <CSelect
                  custom
                  name="ccyear"
                  id="ccyear"
                  value={yearSkill}
                  onChange={(e) => {
                    setOption("year");
                    setYearSkill(e.target.value);
                  }}
                >
                  {years.map((y) => (
                    <option>{y}</option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol xs="6">
              <CFormGroup className="year-select">
                <CLabel className="mr-2" htmlFor="ccyear">
                  Month:
                </CLabel>

                <CSelect
                  custom
                  name="ccyear"
                  id="ccyear"
                  value={month}
                  onChange={(e) => {
                    if (e.target.value === "--") {
                      setOption("year");
                      setMonth("");
                    } else {
                      setOption("month");
                      setMonth(e.target.value);
                    }
                  }}
                >
                  <option>--</option>
                  {months.map((m) => (
                    <option>{m}</option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
        </div>
        {isDataSkill ? (
          <div className="pie-posts">
            <Pie
              style={{ height: "454.4px", width: "2326.4px" }}
              data={skillData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        ) : (
          <div style={{ height: "250px" }}>
            {" "}
            <img src={nodata} alt="" width="100px" />
            <h1 style={{ textAlign: "center", fontSize: "30px" }}>No data </h1>
          </div>
        )}
      </CCardBody>
    </LoadingOverlay>
  );
};

export default PostsStatistic;
