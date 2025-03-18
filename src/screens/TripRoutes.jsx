import React, { useState } from "react";
import TripDetailsForm from "../components/Elements/TripDetailsForm";
import MapView from "../components/Elements/MapView";
import MainLayout from "../components/Layout/MainLayout";
import {
  FormContainer,
  LeftSectionContainer,
  LeftSectionHeader,
} from "../style/view.styles";

export default function TripRoutes() {
  const [formData, setFormData] = useState({
    currentLocation: null,
    pickUpLocation: null,
    dropOffLocation: null,
  });
  const [selectedField, setSelectedField] = useState(null);

  const handleMapClick = (location) => {
    if (selectedField) {
      setFormData((prevData) => ({
        ...prevData,
        [selectedField]: location,
      }));
    }
  };

  const leftContent = (
    <LeftSectionContainer>
      <LeftSectionHeader>
        <h2>Routes</h2>
      </LeftSectionHeader>
      <FormContainer>
        <TripDetailsForm
          formData={formData}
          setFormData={setFormData}
          setSelectedField={setSelectedField}
        />
      </FormContainer>
    </LeftSectionContainer>
  );

  const rightContent = (
    <MapView
      formData={formData}
      onMapClick={(location) => handleMapClick(location)}
    />
  );

  return (
    <MainLayout
      leftContent={leftContent}
      rightContent={rightContent}
      initialSidebarWidth={240}
      initialSidebarState={true}
    />
  );
}
