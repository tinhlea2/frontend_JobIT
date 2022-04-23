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
            <h2 className="h2">
              Meet <span className="skyblue
              ">our management team</span>{" "}
            </h2>
            <div className="members">
              <Member name="Nhat minh" avt={nhatminh} />
              <Member name="Thien nhu" avt={thienthu} />
              <Member name="Lien huong" avt={lienhuong} />
              <Member name="Trang" avt={trang} />
              <Member name="Tinh" avt={tinh} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Members;
