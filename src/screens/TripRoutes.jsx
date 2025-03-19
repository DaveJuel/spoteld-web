import React, { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCheckCircle,
} from "react-icons/ai";
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
import { ButtonsContainer, StepHint } from "../style/route.styles";
import { makeApiRequest } from "../utils/RequestHandler";
import LoadingSpinner from "../components/Elements/LoadingSpinner";

const formatLocation = (location) => {
  if (!location) return null;
  return {
    address_line: location.address || "Unknown Street",
    city: location.city || "Unknown City",
    country: location.country || "Unknown Country",
    longitude: location.lng || 0,
    latitude: location.lat || 0,
  };
};

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
  const [tripId, setTripId] = useState(null);
  const [shipmentId, setShipmentId] = useState(null);
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const driver = await makeApiRequest("/api/driver/user/", "GET", null);
        if (driver) setDriver(driver);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDriver();
  }, []);

  const handleMapClick = (location) => {
    if (selectedField) {
      setFormData((prevData) => ({
        ...prevData,
        [selectedField]: location,
      }));
    }
  };

  const handleNext = async () => {
    if (currentStep === 1 && !tripId) {
      try {
        const response = await makeApiRequest("/api/trip/", "POST", {
          driver: driver?.id,
          vehicle: driver?.vehicle,
          current_location: formatLocation(formData.currentLocation),
          pickup_location: formatLocation(formData.pickUpLocation),
          dropoff_location: formatLocation(formData.dropOffLocation),
        });
        setTripId(response.id);
      } catch (error) {
        console.error("Failed to create trip:", error);
      }
    }
    if (currentStep === 2 && tripId && !shipmentId) {
      try {
        const method = shipmentId ? "PATCH" : "POST";
        const endpoint = shipmentId
          ? `/api/trip/shipment/${shipmentId}/edit`
          : "/api/trip/shipment/";

        const response = await makeApiRequest(endpoint, method, {
          ...formData.shipmentDetails,
        });
        setShipmentId(response.id);
      } catch (error) {
        console.error("Failed to create or update shipment:", error);
      }
    }

    if (currentStep === 3 && tripId) {
      try {
        await makeApiRequest(`/api/trip/${tripId}/edit/`, "PATCH", {
          start_time: formData.schedulingDetails.startTime,
          start_date: formData.schedulingDetails.startDate,
        });
        alert("Trip successfully scheduled!");
      } catch (error) {
        console.error("Failed to update trip:", error);
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

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

  const leftContent = loading ? (
    <LoadingSpinner />
  ) : (
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
              <AiOutlineArrowLeft style={{ marginRight: "5px" }} />
            </ActionButton>
          )}
          {currentStep < 3 ? (
            <ActionButton className="next" onClick={handleNext}>
              <AiOutlineArrowRight style={{ marginLeft: "5px" }} />
            </ActionButton>
          ) : (
            <ActionButton
              className="confirm"
              type="submit"
              onClick={handleNext}
            >
              <AiOutlineCheckCircle style={{ marginRight: "5px" }} />
            </ActionButton>
          )}
        </ButtonsContainer>
      </FormContainer>
    </LeftSectionContainer>
  );

  const rightContent = (
    <MapView formData={formData} onMapClick={handleMapClick} />
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
