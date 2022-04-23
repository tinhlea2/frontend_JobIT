import React from "react";
import image1 from "../../assets/images/aboutus/2.png";
import image2 from "../../assets/images/aboutus/1.png";
import image3 from "../../assets/images/aboutus/3.png";

function WhyChooseUs() {
  return (
    <section className="why-chooseus">
      <div className="why-chooseus__inner">
        <div className="text__title">
          <h2 className="h2">
            Why <span className="skyblue">choose us?</span>
          </h2>
        </div>
        <div className="items">
          <div className="item">
            <div className="item__inner">
              <img width="300px" height="300px" src={image1} alt="" />
              <div className="item__inner__text">
                <h3 className="h3 underline underline--secondary">
                  Focus only on IT jobs
                </h3>
                <p className="text--xlarge">
                  We designed our site exclusively for the needs and interests
                  of IT jobseekers.
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="item__inner">
              <img width="300px" height="300px" src={image2} alt="" />
              <div className="item__inner__text">
                <h3 className="h3 underline underline--primary">
                  Screen candidates
                </h3>
                <p className="text--xlarge">
                  Employers receive CVs only from experienced developers.
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="item__inner">
              <img width="300px" height="300px" src={image3} alt="" />
              <div className="item__inner__text">
                <h3 className="h3 underline underline--blue">
                  Provide company reviews
                </h3>
                <p className="text--xlarge">
                  Jobseekers can see what it’s like to work inside a company
                  before they apply.
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
