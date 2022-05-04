import React from "react";

import { Banner, Feedback, Members, WhyChooseUs } from "src/components/about";

const AboutUs = () => {
  return (
    <>
      <Members />
      {/* <Banner /> */}
      <WhyChooseUs />
      <Feedback />
    </>
  );
};

export default AboutUs;
