import React from "react";
import styled from "styled-components";

const DriverForm = ({ driverProfile, editing, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...driverProfile, [name]: value });
  };

  return (
    <ProfileGrid>
      <FormGroup>
        <Label>Driver ID</Label>
        <Input name="id" value={driverProfile.id} disabled />
      </FormGroup>
      <FormGroup>
        <Label>First Name</Label>
        <Input 
          name="firstName"
          value={driverProfile.firstName} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Last Name</Label>
        <Input 
          name="lastName"
          value={driverProfile.lastName} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input 
          name="email"
          value={driverProfile.email} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Phone</Label>
        <Input 
          name="phone"
          value={driverProfile.phone} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>License Number</Label>
        <Input 
          name="licenseNumber"
          value={driverProfile.licenseNumber} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>License Expiry</Label>
        <Input 
          name="licenseExpiry"
          type="date" 
          value={driverProfile.licenseExpiry} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup fullWidth>
        <Label>Address</Label>
        <Input 
          name="address"
          value={driverProfile.address} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup fullWidth>
        <Label>Emergency Contact</Label>
        <Input 
          name="emergencyContact"
          value={driverProfile.emergencyContact} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Experience</Label>
        <Input 
          name="experience"
          value={driverProfile.experience} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
    </ProfileGrid>
  );
};

export default DriverForm;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const FormGroup = styled.div`
  grid-column: ${props => props.fullWidth ? '1 / -1' : 'auto'};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.disabled ? '#ddd' : '#ccc'};
  border-radius: 4px;
  background: ${props => props.disabled ? '#f9f9f9' : 'white'};
  color: ${props => props.disabled ? '#666' : '#333'};
  
  &:focus {
    outline: none;
    border-color: #2c3e50;
    box-shadow: 0 0 0 2px rgba(44, 62, 80, 0.1);
  }
`;