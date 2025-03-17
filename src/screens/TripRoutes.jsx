import React, { useState } from "react";
import styled from "styled-components";
import TripDetailsForm from "../components/Elements/TripDetailsForm";
import MapView from "../components/Elements/MapView";
import SidebarNav from "../components/Nav/Sidebar";

export default function TripRoutes() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [formData, setFormData] = useState({
    currentLocation: null,
    pickUpLocation: null,
    dropOffLocation: null,
  });

  const [selectedField, setSelectedField] = useState(null);

  const handleSidebarChange = (isOpen, width) => {
    setSidebarOpen(isOpen);
    setSidebarWidth(width);
  };

  const handleMapClick = (location) => {
    if (selectedField) {
      setFormData((prevData) => ({
        ...prevData,
        [selectedField]: location,
      }));
    }
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
              <TripDetailsForm
                formData={formData}
                setFormData={setFormData}
                setSelectedField={setSelectedField}
              />
            </FormContainer>
          </LeftSection>
          <RightSection>
            <MapView
              formData={formData}
              onMapClick={(location) => handleMapClick(location)}
            />
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
  transition: all 0.3s ease;
  margin-left: 0;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
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
