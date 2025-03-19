import React from "react";
import {
  Form,
  LabelRow,
  Label,
  StyledInput,
  LocationFieldset,
} from "../../style/view.styles";

const TripShipmentForm = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      shipmentDetails: {
        ...prevData.shipmentDetails,
        [name]: value,
      },
    }));
  };

  return (
    <Form>
      <LocationFieldset>
        <LabelRow>
          <Label htmlFor="description">Item Description:</Label>
        </LabelRow>
        <StyledInput
          type="text"
          name="description"
          value={formData.shipmentDetails.description || ""}
          onChange={handleInputChange}
          placeholder="Enter item description"
        />
      </LocationFieldset>

      <LocationFieldset>
        <LabelRow>
          <Label htmlFor="weight">Weight (kg):</Label>
        </LabelRow>
        <StyledInput
          type="number"
          name="weight"
          value={formData.shipmentDetails.weight || ""}
          onChange={handleInputChange}
          placeholder="Enter weight"
        />
      </LocationFieldset>

      <LocationFieldset>
        <LabelRow>
          <Label htmlFor="quantity">Quantity:</Label>
        </LabelRow>
        <StyledInput
          type="number"
          name="quantity"
          value={formData.shipmentDetails.quantity || ""}
          onChange={handleInputChange}
          placeholder="Enter quantity"
        />
      </LocationFieldset>
    </Form>
  );
};

export default TripShipmentForm;
