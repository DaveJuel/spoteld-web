import React from "react";
import styled from "styled-components";

const CarrierForm = ({ carrierProfile, editing, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...carrierProfile, [name]: value });
  };

  return (
    <ProfileGrid>
      <FormGroup>
        <Label>Carrier ID</Label>
        <Input name="id" value={carrierProfile.id} disabled />
      </FormGroup>
      <FormGroup fullWidth>
        <Label>Company Name</Label>
        <Input 
          name="companyName"
          value={carrierProfile.companyName} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>DOT Number</Label>
        <Input 
          name="dot"
          value={carrierProfile.dot} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>MC Number</Label>
        <Input 
          name="mcNumber"
          value={carrierProfile.mcNumber} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input 
          name="email"
          value={carrierProfile.email} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Phone</Label>
        <Input 
          name="phone"
          value={carrierProfile.phone} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup fullWidth>
        <Label>Address</Label>
        <Input 
          name="address"
          value={carrierProfile.address} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Fleet Size</Label>
        <Input 
          name="fleetSize"
          type="number" 
          value={carrierProfile.fleetSize} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Insurance Provider</Label>
        <Input 
          name="insuranceProvider"
          value={carrierProfile.insuranceProvider} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Insurance Policy</Label>
        <Input 
          name="insurancePolicy"
          value={carrierProfile.insurancePolicy} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Insurance Expiry</Label>
        <Input 
          name="insuranceExpiry"
          type="date" 
          value={carrierProfile.insuranceExpiry} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
    </ProfileGrid>
  );
};

export default CarrierForm;

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