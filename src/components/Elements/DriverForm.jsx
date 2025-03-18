import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { makeApiRequest } from "../../utils/RequestHandler";
import LoadingSpinner from "../Elements/LoadingSpinner";

const DriverForm = () => {
  const [driverProfile, setDriverProfile] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [isNewProfile, setIsNewProfile] = useState(true);
  const statuses = ["off duty", "sleeper berth", "driving", "on duty"];

  useEffect(() => {
    const fetchDriverProfile = async () => {
      setLoading(true);
      try {
        const response = await makeApiRequest("/api/driver/user", "GET");
        setDriverProfile(response);
        if(response) setIsNewProfile(false);
      } catch (error) {
        console.error("Failed to fetch driver profile:", error);
        setDriverProfile(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await makeApiRequest("/api/vehicle/all", "GET", null);
        setVehicles(response.vehicles || []);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    setEditing(true);
    fetchDriverProfile();
    fetchVehicles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(isNewProfile) {
        await makeApiRequest("/api/driver/", "POST", driverProfile);
      }else{
        await makeApiRequest(`/api/driver/${driverProfile.id}/edit`, "PATCH", driverProfile);
      }
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form onSubmit={handleSubmit}>
      <ProfileGrid>
        <FormGroup>
          <Label>Vehicle ID</Label>
          <SelectBox
            name="vehicle"
            value={driverProfile?.vehicle || ""}
            onChange={handleChange}
            disabled={!editing}
          >
            <option value="">Select a vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name || `Vehicle ${vehicle.id}`}
              </option>
            ))}
          </SelectBox>
        </FormGroup>
        
        <FormGroup>
          <Label>Current Status</Label>
          <SelectBox
            name="current_status"
            value={driverProfile?.current_status || ""}
            onChange={handleChange}
            disabled={!editing}
          >
            <option value="">Select a status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </SelectBox>
        </FormGroup>
        
        <FormGroup fullWidth>
          <SubmitButton type="submit" disabled={!editing}>
            Submit
          </SubmitButton>
        </FormGroup>
      </ProfileGrid>
    </form>
  );
};

export default DriverForm;

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

const SelectBox = styled.select`
  width: 97%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border 0.3s;
  &:focus {
    border-color: #4caf50;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #45a049;
  }
  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;
