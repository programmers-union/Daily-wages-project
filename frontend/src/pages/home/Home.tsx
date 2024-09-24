import React from "react";
import Banner from "../../components/home/Banner";
import styled from "styled-components";
// import HomeNavBar from "../../components/header/HomeNavBar";
import SecondSection from "../../components/home/SecondSection";

const Home: React.FC = () => {
  const MainSection = styled.html`
    scroll-snap-type: y mandatory;
  `;
  const SubSection = styled.div`
    scroll-snap-align: start;
    scroll-snap-stop: always;
  `;
  return (
    <div className="bg-custom-gradient ">
      {/* <HomeNavBar /> */}
      <MainSection>
        <SubSection>
          <Banner />
        </SubSection>
        <SubSection>
          <SecondSection />
        </SubSection>
      </MainSection>
    </div>
  );
};

export default Home;
