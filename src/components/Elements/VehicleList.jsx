import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { makeApiRequest } from "../../utils/RequestHandler";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await makeApiRequest("/api/vehicle/all", "GET", null);
        setVehicles(response.vehicles || []);
      } catch (err) {
        setError("Failed to fetch vehicles.");
      }finally{
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <div>Loading vehicles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <VehicleListContainer>
      {vehicles.length === 0 ? (
        <NoVehicles>No vehicles added yet</NoVehicles>
      ) : (
        <VehicleTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Make</th>
              <th>Model</th>
              <th>License Plate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td>{vehicle.id || 'N/A'}</td>
                <td>{vehicle.make || 'N/A'}</td>
                <td>{vehicle.model || 'N/A'}</td>
                <td>{vehicle.license_plate || 'N/A'}</td>
                <td>
                  <StatusBadge status={vehicle.status}>
                    {vehicle.status ? vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1) : 'Unknown'}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </VehicleTable>
      )}
    </VehicleListContainer>
  );
};

export default VehicleList;

const VehicleListContainer = styled.div`
  margin-top: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;


const NoVehicles = styled.div`
  padding: 20px;
  text-align: center;
  color: #666;
`;

const VehicleTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    font-weight: 600;
    color: #333;
    background-color: #f9f9f9;
  }

  .center {
    text-align: center;
  }

  .active-row {
    background-color: #f0f7ff;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => {
    switch(props.status) {
      case 'active': return '#e3f3e6';
      case 'maintenance': return '#fff3e0';
      case 'inactive': return '#f5f5f5';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#2e7d32';
      case 'maintenance': return '#e65100';
      case 'inactive': return '#757575';
      default: return '#757575';
    }
  }};
`;
