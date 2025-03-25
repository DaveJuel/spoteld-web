import React, { useState } from "react";
import {
  LocationFieldset,
  LabelRow,
  Label,
  InputWrapper,
  LocationDetails,
  DetailItem,
  Strong,
  StyledMapPin,
  DetailsToggle,
  StyledInput,
} from "../../style/view.styles";

const ChevronDownIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUpIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

export default function TripDetailsForm({
  formData,
  setFormData,
  setSelectedField,
  handleSearchLocation,
}) {
  const [expandedFields, setExpandedFields] = useState({
    currentLocation: false,
    pickUpLocation: false,
    dropOffLocation: false,
  });

  const handleClick = (field) => {
    setSelectedField(field);
  };

  const toggleDetails = (field) => {
    setExpandedFields({
      ...expandedFields,
      [field]: !expandedFields[field],
    });
  };

  const handleInputChange = (e, field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: {
        ...prevFormData[field],
        address_line: e.target.value,
      },
    }));
  };

  const handleKeyDown = (e, field) => {
    const specialKeys = ["Enter"];

    if (specialKeys.includes(e.key)) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (formData[field]?.address_line?.trim()) {
          handleSearchLocation(formData[field].address_line);
        }
      }
    }
  };

  const renderLocationDetails = (location, field) => {
    if (!expandedFields[field] || !formData[field]) return null;

    return (
      <LocationDetails>
        <DetailItem>
          <Strong>City:</Strong> {formData[field].city || "Not specified"}
        </DetailItem>
        <DetailItem>
          <Strong>Country:</Strong> {formData[field].country || "Not specified"}
        </DetailItem>
        <DetailItem>
          <Strong>Lat:</Strong> {formData[field].latitude || "N/A"}
        </DetailItem>
        <DetailItem>
          <Strong>Long:</Strong> {formData[field].longitude || "N/A"}
        </DetailItem>
      </LocationDetails>
    );
  };

  const getIcon = (field) => {
    // Different colored map pins for each location type
    switch (field) {
      case "currentLocation":
        return <StyledMapPin size={20} color="#e63946" />;
      case "pickUpLocation":
        return <StyledMapPin size={20} color="#3a86ff" />;
      case "dropOffLocation":
        return <StyledMapPin size={20} color="#38b000" />;
      default:
        return null;
    }
  };

  return (
    <>
      {["currentLocation", "pickUpLocation", "dropOffLocation"].map((field) => (
        <LocationFieldset key={field}>
          <LabelRow>
            {getIcon(field)}
            <Label>
              {field === "currentLocation"
                ? "Current Location"
                : field === "pickUpLocation"
                ? "Pick Up Location"
                : "Drop Off Location"}
            </Label>
            <DetailsToggle onClick={() => toggleDetails(field)}>
              {expandedFields[field] ? (
                <ChevronUpIcon size={18} />
              ) : (
                <ChevronDownIcon size={18} />
              )}
            </DetailsToggle>
          </LabelRow>

          <InputWrapper>
            <StyledInput
              type="text"
              name={field}
              placeholder={`Type ${
                field === "currentLocation"
                  ? "current"
                  : field === "pickUpLocation"
                  ? "pick-up"
                  : "drop-off"
              } location, and press enter.`}
              value={formData[field]?.address_line || ""}
              onClick={() => handleClick(field)}
              onChange={(e) => handleInputChange(e, field)}
              onKeyDown={(e) => handleKeyDown(e, field)}
              $hasCoordinates={!!(formData[field]?.latitude && formData[field]?.longitude)}
            />
          </InputWrapper>

          {renderLocationDetails(formData[field], field)}
        </LocationFieldset>
      ))}
    </>
  );
}
