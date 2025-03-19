import React, { useEffect } from "react";
import {
  Form,
  LabelRow,
  Label,
  StyledInput,
  LocationFieldset,
} from "../../style/view.styles";

const generateShipmentNo = () => {
  // Generate a random 8-digit alphanumeric string
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const TripShipmentForm = ({ formData, setFormData, setIsNextDisabled }) => {
  useEffect(() => {
    // Generate shipment_no if it doesn't already exist
    if (!formData.shipmentDetails?.shipment_no) {
      const shipmentNo = generateShipmentNo();
      setFormData((prevData) => ({
        ...prevData,
        shipmentDetails: {
          ...prevData.shipmentDetails,
          shipment_no: shipmentNo,
        },
      }));
    }
  }, [formData, setFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      shipmentDetails: {
        ...prevData.shipmentDetails,
        [name]: value,
      },
    }));
    if (
      formData.shipmentDetails &&
      formData.shipmentDetails.shipment_no &&
      formData.shipmentDetails.description &&
      formData.shipmentDetails.load_size &&
      formData.shipmentDetails.load_unit
    ) {
      setIsNextDisabled(false);
    }
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
          <Label htmlFor="load_size">Size :</Label>
        </LabelRow>
        <StyledInput
          type="number"
          name="load_size"
          value={formData.shipmentDetails.load_size || ""}
          onChange={handleInputChange}
          placeholder="Enter size"
        />
      </LocationFieldset>

      <LocationFieldset>
        <LabelRow>
          <Label htmlFor="load_unit">Measured In (kg, lb, ton):</Label>
        </LabelRow>
        <StyledInput
          type="text"
          name="load_unit"
          value={formData.shipmentDetails.load_unit || ""}
          onChange={handleInputChange}
          placeholder="Enter measurement unit"
        />
      </LocationFieldset>
    </Form>
  );
};

export default TripShipmentForm;
