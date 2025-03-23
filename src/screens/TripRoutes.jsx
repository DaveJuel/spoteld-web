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
import ConfirmTripForm from "../components/Elements/ConfirmTripForm";
import DailyLogLayout from "../components/Elements/DailyLogView";

const truncateToNineDigits = (number) => {
  if (typeof number !== "number") return 0;
  return Number(number.toFixed(6));
};

const formatLocation = (location) => {
  if (!location) return null;
  return {
    address_line: location.address_line || "Unknown Street",
    city: location.city || "Unknown City",
    country: location.country || "Unknown Country",
    longitude: truncateToNineDigits(location.longitude || 0),
    latitude: truncateToNineDigits(location.latitude || 0),
  };
};

export default function TripRoutes() {
  const [formData, setFormData] = useState({
    currentLocation: {
      address_line: "",
      city: "",
      country: "",
      latitude: null,
      longitude: null,
    },
    pickUpLocation: {
      address_line: "",
      city: "",
      country: "",
      latitude: null,
      longitude: null,
    },
    dropOffLocation: {
      address_line: "",
      city: "",
      country: "",
      latitude: null,
      longitude: null,
    },
    shipmentDetails: {},
    schedulingDetails: {},
  });
  const [selectedField, setSelectedField] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [tripId, setTripId] = useState(null);
  const [shipmentId, setShipmentId] = useState(null);
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [searchLocationQuery, setSearchLocationQuery] = useState("");

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const driver = await makeApiRequest("/api/driver/user/", "GET", null);
        if (driver) setDriver(driver);
      } catch (error) {
        console.error(error);
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
    if (
      formData.currentLocation &&
      formData.pickUpLocation &&
      selectedField === "dropOffLocation"
    )
      setIsNextDisabled(false);
  };

  const handleMapSearch = (query) => {
    setSearchLocationQuery(query);
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
        setIsNextDisabled(true);
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
        setIsNextDisabled(true);
      } catch (error) {
        console.error("Failed to create or update shipment:", error);
      }
    }

    if (currentStep === 3 && tripId) {
      try {
        await makeApiRequest(`/api/trip/${tripId}/edit/`, "PATCH", {
          start_time: formData.schedulingDetails.startTime,
          start_date: formData.schedulingDetails.startDate,
          shipment: shipmentId,
        });
      } catch (error) {
        console.error("Failed to update trip:", error);
      }
    }

    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setIsNextDisabled(false);
  };

  const getStepHint = () => {
    switch (currentStep) {
      case 1:
        return "Set your pickup and drop-off locations to plan your route";
      case 2:
        return "Provide details about your shipment including weight, dimensions, and type";
      case 3:
        return "Schedule your trip by selecting date, time, and any special instructions";
      case 4:
        return "Save your trip route";
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
            handleSearchLocation={handleMapSearch}
          />
        )}
        {currentStep === 2 && (
          <TripShipmentForm
            formData={formData}
            setFormData={setFormData}
            setIsNextDisabled={setIsNextDisabled}
          />
        )}
        {currentStep === 3 && (
          <TripSchedulingForm
            formData={formData}
            setFormData={setFormData}
            setIsNextDisabled={setIsNextDisabled}
          />
        )}
        {currentStep === 4 && (
          <ConfirmTripForm
            tripId={tripId}
            shipmentDetails={formData.shipmentDetails}
          />
        )}

        <ButtonsContainer>
          {currentStep > 1 && (
            <ActionButton className="previous" onClick={handlePrevious}>
              <AiOutlineArrowLeft style={{ marginRight: "5px" }} />
            </ActionButton>
          )}
          {currentStep < 4 ? (
            <ActionButton
              className="next"
              disabled={isNextDisabled}
              onClick={handleNext}
            >
              <AiOutlineArrowRight style={{ marginLeft: "5px" }} />
            </ActionButton>
          ) : (
            <ActionButton
              className="confirm"
              type="submit"
              disabled={isNextDisabled}
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
    <>
      {currentStep === 4 ? (
        <DailyLogLayout
          tripId={tripId}
          formData={formData}
          onMapClick={handleMapClick}
        />
      ) : (
        <MapView
          mapData={formData}
          onMapClick={handleMapClick}
          searchLocationQuery={searchLocationQuery}
        />
      )}
    </>
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
