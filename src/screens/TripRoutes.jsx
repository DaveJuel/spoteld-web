import React, { useState } from "react";
import styled from "styled-components";
import TripDetailsForm from "../components/Elements/TripDetailsForm";
import MapView from "../components/Elements/MapView";
import SidebarNav from "../components/Nav/Sidebar";

export default function TripRoutes() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(240);

  // Function to handle sidebar state changes
  const handleSidebarChange = (isOpen, width) => {
    setSidebarOpen(isOpen);
    setSidebarWidth(width);
  };

  return (
    <>
      <MainContainer>
        {/* Retractable Sidebar with state change handler */}
        <SidebarNav
          onStateChange={handleSidebarChange}
          sidebarOpen={sidebarOpen}
        />
        {/* Content Area with Form and Map */}
        <ContentWrapper sidebarWidth={sidebarWidth}>
          <LeftSection>
            <FormContainer>
              <TripDetailsForm />
            </FormContainer>
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
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 0;
  gap: 20px;
  transition: all 0.3s ease;
  margin-left: 0;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  min-width: 300px;
  max-width: 450px;
  height: 100%;
  border-right: 1px solid #ddd;
`;

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background: white;
`;

const RightSection = styled.div`
  flex: 2;
  height: 100%;
`;
