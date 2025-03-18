import React, { useState } from "react";
import styled from "styled-components";
import { makeApiRequest } from "../../utils/RequestHandler";

const VehicleForm = ({setEditing}) => {
  const [vehicle, setVehicle] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prevVehicle) => ({ ...prevVehicle, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await makeApiRequest("/api/vehicle/", "POST", {
        make: vehicle.make,
        model: vehicle.model,
        license_plate: vehicle.licensePlate,
        vehicle_type: "truck",
      });
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ProfileGrid>
        <FormGroup>
          <Label>Vehicle ID</Label>
          <Input name="id" value={vehicle?.id || ""} disabled />
        </FormGroup>
        <FormGroup>
          <Label>Make</Label>
          <Input
            name="make"
            value={vehicle?.make || ""}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Model</Label>
          <Input
            name="model"
            value={vehicle?.model || ""}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>License Plate</Label>
          <Input
            name="licensePlate"
            value={vehicle?.licensePlate || ""}
            onChange={handleChange}
          />
        </FormGroup>
      </ProfileGrid>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </SubmitButton>
    </>
  );
};

export default VehicleForm;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const FormGroup = styled.div`
  grid-column: ${(props) => (props.fullWidth ? "1 / -1" : "auto")};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-size: 14px;
`;

const Input = styled.input`
  width: 97%;
  padding: 10px;
  border: 1px solid ${(props) => (props.disabled ? "#ddd" : "#ccc")};
  background: ${(props) => (props.disabled ? "#f9f9f9" : "white")};
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
