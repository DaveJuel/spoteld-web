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
        <Input
          type="text"
          name="currentLocation"
          placeholder="Current Location"
          value={formData.currentLocation?.address_line || ""}
          onClick={() => handleClick("currentLocation")}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="pickUpLocation"
          placeholder="Pick Up Location"
          value={formData.pickUpLocation?.address_line || ""}
          onClick={() => handleClick("pickUpLocation")}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="dropOffLocation"
          placeholder="Drop Off Location"
          value={formData.dropOffLocation?.address_line || ""}
          onClick={() => handleClick("dropOffLocation")}
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
