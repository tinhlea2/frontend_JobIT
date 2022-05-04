import React from "react";
import Member from "../common/Member";

import thienthu from "../../assets/images/members/thiennhu.png";
import lienhuong from "../../assets/images/members/lienhuong.png";
import nhatminh from "../../assets/images/members/nhatminh.png";
import trang from "../../assets/images/members/trang.png";
import tinh from "../../assets/images/members/tinh.png";

function Members() {
  return (
    <section className="about_member">
      <div className="about_member__inner ">
        <div className="about_member__inner__text">
          <div className="text__title">
            <h2 className="h2 text-center">
              Meet{" "}
              <span
                className="skyblue
              "
              >
                our team in this project
              </span>{" "}
            </h2>
            <div className="members">
              <Member name="Minh Nhật" avt={nhatminh} />
              <Member name="Thiên Như" avt={thienthu} />
              <Member name="Liên Hương" avt={lienhuong} />
              <Member name="HuyềnTrang" avt={trang} />
              <Member name="Thị Tình" avt={tinh} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Members;
