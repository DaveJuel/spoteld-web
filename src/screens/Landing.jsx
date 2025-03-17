import React from "react";
import styled from "styled-components";
import TripDetailsForm from "../components/Elements/TripDetailsForm";
import MapView from "../components/Elements/MapView";
import SidebarNav from "../components/Nav/Sidebar";

export default function Landing() {
  return (
    <>
      <MainContainer>
        {/* Retractable Sidebar */}
        <SidebarNav/>

        {/* Content Area with Form and Map */}
        <ContentWrapper>
          <LeftSection>
            <TripDetailsForm />
          </LeftSection>
          <RightSection>
            <MapView />
          </RightSection>
        </ContentWrapper>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f4f8;
`;


const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 20px;
  gap: 20px;
  transition: margin-left 0.3s ease;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const RightSection = styled.div`
  flex: 2;
`;