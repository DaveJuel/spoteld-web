import React, { useState } from "react";
import TripDetailsForm from "../components/Elements/TripDetailsForm";
import MapView from "../components/Elements/MapView";
import SidebarNav from "../components/Nav/Sidebar";
import { MainContainer, ContentWrapper, LeftSection, RightSection, FormContainer } from "../style/view.styles";


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