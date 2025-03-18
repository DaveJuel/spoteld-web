import React from "react";
import styled from "styled-components";

const VehicleForm = ({ vehicle, editing, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...vehicle, [name]: value });
  };

  return (
    <ProfileGrid>
      <FormGroup>
        <Label>Vehicle ID</Label>
        <Input name="id" value={vehicle.id} disabled />
      </FormGroup>
      <FormGroup>
        <Label>Make</Label>
        <Input 
          name="make"
          value={vehicle.make} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Model</Label>
        <Input 
          name="model"
          value={vehicle.model} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Year</Label>
        <Input 
          name="year"
          type="number"
          value={vehicle.year} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>VIN</Label>
        <Input 
          name="vin"
          value={vehicle.vin} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>License Plate</Label>
        <Input 
          name="licensePlate"
          value={vehicle.licensePlate} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>State/Province</Label>
        <Input 
          name="state"
          value={vehicle.state} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Registration Expiry</Label>
        <Input 
          name="registrationExpiry"
          type="date" 
          value={vehicle.registrationExpiry} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Last Inspection</Label>
        <Input 
          name="lastInspection"
          type="date" 
          value={vehicle.lastInspection} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Status</Label>
        <Select
          name="status"
          value={vehicle.status}
          disabled={!editing}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </Select>
      </FormGroup>
      <FormGroup fullWidth>
        <Label>Notes</Label>
        <TextArea 
          name="notes"
          value={vehicle.notes} 
          disabled={!editing}
          onChange={handleChange}
        />
      </FormGroup>
    </ProfileGrid>
  );
};

export default VehicleForm;

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

const Select = styled.select`
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.disabled ? '#ddd' : '#ccc'};
  border-radius: 4px;
  background: ${props => props.disabled ? '#f9f9f9' : 'white'};
  color: ${props => props.disabled ? '#666' : '#333'};
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #2c3e50;
    box-shadow: 0 0 0 2px rgba(44, 62, 80, 0.1);
  }
`;