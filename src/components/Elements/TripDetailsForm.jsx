import React, { useState } from "react";
import styled from "styled-components";

const MapPinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const NavigationIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
  </svg>
);

const ChevronDownIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUpIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

export default function TripDetailsForm({
  formData,
  setFormData,
  setSelectedField,
}) {
  const [expandedFields, setExpandedFields] = useState({
    currentLocation: false,
    pickUpLocation: false,
    dropOffLocation: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: { ...formData[name], address_line: value } 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const handleClick = (field) => {
    setSelectedField(field);
  };

  const toggleDetails = (field) => {
    setExpandedFields({
      ...expandedFields,
      [field]: !expandedFields[field]
    });
  };

  const renderLocationDetails = (location, field) => {
    if (!expandedFields[field] || !formData[field]) return null;
    
    return (
      <LocationDetails>
        <DetailItem><Strong>City:</Strong> {formData[field].city || "Not specified"}</DetailItem>
        <DetailItem><Strong>Country:</Strong> {formData[field].country || "Not specified"}</DetailItem>
        <CoordinatesWrapper>
          <DetailItem><Strong>Lat:</Strong> {formData[field].latitude || "N/A"}</DetailItem>
          <DetailItem><Strong>Long:</Strong> {formData[field].longitude || "N/A"}</DetailItem>
        </CoordinatesWrapper>
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
    <FormContainer>
      <FormHeader>
        <NavigationIcon size={24} color="#3a86ff" />
        <Heading>Trip Details</Heading>
      </FormHeader>
      
      <Form onSubmit={handleSubmit}>
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
                {expandedFields[field] ? 
                  <ChevronUpIcon size={18} /> : 
                  <ChevronDownIcon size={18} />}
              </DetailsToggle>
            </LabelRow>
            
            <InputWrapper>
              <StyledInput
                type="text"
                name={field}
                placeholder={`Enter ${field === "currentLocation" 
                  ? "current" 
                  : field === "pickUpLocation" 
                    ? "pick-up" 
                    : "drop-off"} location`}
                value={formData[field]?.address_line || ""}
                onClick={() => handleClick(field)}
                onChange={handleChange}
              />
            </InputWrapper>
            
            {renderLocationDetails(formData[field], field)}
          </LocationFieldset>
        ))}
        
        <SubmitButton type="submit">
          <span>Confirm Trip Details</span>
        </SubmitButton>
      </Form>
    </FormContainer>
  );
}

// Styled components with enhanced design
const FormContainer = styled.div`
  padding: 24px;
  background-color: white;
  max-width: 500px;
  margin: 0 auto;
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  color: #3a86ff;
  gap: 12px;
`;

const Heading = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LocationFieldset = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  padding: 12px 16px;
  transition: all 0.2s ease;
  
  &:focus-within {
    border-color: #3a86ff;
    box-shadow: 0 0 0 2px rgba(58, 134, 255, 0.1);
  }
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  margin: 0 auto 0 8px;
  color: #333;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  padding: 12px;
  padding-left: 12px;
  border: 1px solid #e0e0e0;
  font-size: 16px;
  width: 92%;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3a86ff;
    box-shadow: 0 0 0 2px rgba(58, 134, 255, 0.1);
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const LocationDetails = styled.div`
  background-color: #f9f9f9;
  padding: 12px;
  margin-top: 8px;
  font-size: 14px;
`;

const DetailItem = styled.div`
  margin-bottom: 4px;
  color: #555;
`;

const CoordinatesWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 4px;
`;

const Strong = styled.span`
  font-weight: 600;
  color: #333;
`;

const DetailsToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  
  &:hover {
    color: #3a86ff;
  }
`;

const StyledMapPin = styled(MapPinIcon)`
  flex-shrink: 0;
`;

const SubmitButton = styled.button`
  padding: 14px;
  background-color: #3a86ff;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  margin-top: 8px;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: #2168df;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(58, 134, 255, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;