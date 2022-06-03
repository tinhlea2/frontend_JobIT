import React from "react";
import image1 from "../../assets/images/aboutus/2.png";
import image2 from "../../assets/images/aboutus/1.png";
import image3 from "../../assets/images/aboutus/3.png";

function WhyChooseUs() {
  return (
    <section className="why-chooseus">
      <div className="why-chooseus__inner">
        <div className="text__title">
          <h2 className="h2 text-center">
            About <span className="skyblue"> us?</span>
          </h2>
        </div>
        <div className="items">
          <div className="item">
            <div className="item__inner">
              <img width="300px" height="300px" src={image1} alt="" />
              <div className="item__inner__text">
                <h3 className="h3 underline underline--secondary">
                  Why choose us?
                </h3>
                <p className="text--xlarge">
                We help you grow your career.
                </p>
                <p className="text--xlarge">
                We do this by featuring the best IT jobs.
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="item__inner">
              <img width="300px" height="300px" src={image2} alt="" />
              <div className="item__inner__text">
                <h3 className="h3 underline underline--primary">
                What make us different?
                </h3>
                <p className="text--xlarge">
                  We focus only on IT jobs.
                </p>
                <p className="text--xlarge">
                Screen candidates.
                </p>
                <p className="text--xlarge">
                Provide company reviews.
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="item__inner">
              <img width="300px" height="300px" src={image3} alt="" />
              <div className="item__inner__text">
                <h3 className="h3 underline underline--blue">
                What are our details?
                </h3>
                <p className="text--xlarge">
                  Name: IT jobs.
                </p>
                <p className="text--xlarge">
                  Address: 54 Nguyen Luong Bang.
                </p>
                <p className="text--xlarge">
                  Tel: 0922054327.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
