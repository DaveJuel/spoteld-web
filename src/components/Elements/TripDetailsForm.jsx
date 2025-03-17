import React from "react";
import styled from "styled-components";

export default function TripDetailsForm({
  formData,
  setFormData,
  setSelectedField,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const handleClick = (field) => {
    setSelectedField(field);
  };

  return (
    <FormContainer>
      <h2>Trip Details</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Current Location</Label>
          <Input
            type="text"
            name="currentLocation"
            placeholder="Click on the map to set current location"
            value={formData.currentLocation?.address_line || ""}
            onClick={() => handleClick("currentLocation")}
            onChange={handleChange}
            readOnly
          />
        </FormGroup>

        <FormGroup>
          <Label>Pick Up Location</Label>
          <Input
            type="text"
            name="pickUpLocation"
            placeholder="Click on the map to set pick-up location"
            value={formData.pickUpLocation?.address_line || ""}
            onClick={() => handleClick("pickUpLocation")}
            onChange={handleChange}
            readOnly
          />
        </FormGroup>

        <FormGroup>
          <Label>Drop Off Location</Label>
          <Input
            type="text"
            name="dropOffLocation"
            placeholder="Click on the map to set drop-off location"
            value={formData.dropOffLocation?.address_line || ""}
            onClick={() => handleClick("dropOffLocation")}
            onChange={handleChange}
            readOnly
          />
        </FormGroup>

        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
}

// Styled Components
const FormContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 40px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;
