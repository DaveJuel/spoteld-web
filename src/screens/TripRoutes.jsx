import React, { useState } from "react";
import {
  ActionButton,
  FormContainer,
  LeftSectionContainer,
  LeftSectionHeader,
} from "../style/view.styles";
import TripDetailsForm from "../components/Elements/TripDetailsForm";
import TripShipmentForm from "../components/Elements/TripShipmentForm";
import TripSchedulingForm from "../components/Elements/TripSchedulingForm";
import MapView from "../components/Elements/MapView";
import MainLayout from "../components/Layout/MainLayout";
import {
  ButtonsContainer,
  StepHint,
} from "../style/route.styles";

export default function TripRoutes() {
  const [formData, setFormData] = useState({
    currentLocation: null,
    pickUpLocation: null,
    dropOffLocation: null,
    shipmentDetails: {},
    schedulingDetails: {},
  });
  const [selectedField, setSelectedField] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleMapClick = (location) => {
    if (selectedField) {
      setFormData((prevData) => ({
        ...prevData,
        [selectedField]: location,
      }));
    }
  };

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const handlePrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const getStepHint = () => {
    switch (currentStep) {
      case 1:
        return "Set your pickup and drop-off locations to plan your route";
      case 2:
        return "Provide details about your shipment including weight, dimensions, and type";
      case 3:
        return "Schedule your trip by selecting date, time, and any special instructions";
      default:
        return "";
    }
  };

  const leftContent = (
    <LeftSectionContainer>
      <LeftSectionHeader>
        <h2>Plan your trip</h2>
      </LeftSectionHeader>
      <StepHint>{getStepHint()}</StepHint>
      <FormContainer>
        {currentStep === 1 && (
          <TripDetailsForm
            formData={formData}
            setFormData={setFormData}
            setSelectedField={setSelectedField}
          />
        )}
        {currentStep === 2 && (
          <TripShipmentForm formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 3 && (
          <TripSchedulingForm formData={formData} setFormData={setFormData} />
        )}

        <ButtonsContainer>
          {currentStep > 1 && (
            <ActionButton className="previous" onClick={handlePrevious}>
              Previous
            </ActionButton>
          )}
          {currentStep < 3 ? (
            <ActionButton className="next" onClick={handleNext}>
              Continue
            </ActionButton>
          ) : (
            <ActionButton className="confirm" type="submit">
              Confirm Trip
            </ActionButton>
          )}
        </ButtonsContainer>
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
