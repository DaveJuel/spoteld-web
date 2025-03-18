import React from "react";
import styled from "styled-components";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const VehicleList = ({ vehicles, onSelect, onSetActive, onDelete, activeVehicleId }) => {
  return (
    <VehicleListContainer>
      <VehicleListHeader>
        <h3>Vehicles</h3>
      </VehicleListHeader>
      
      {vehicles.length === 0 ? (
        <NoVehicles>No vehicles added yet</NoVehicles>
      ) : (
        <VehicleTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Make/Model</th>
              <th>Year</th>
              <th>Status</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id} className={vehicle.id === activeVehicleId ? 'active-row' : ''}>
                <td>{vehicle.id}</td>
                <td>{vehicle.make} {vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>
                  <StatusBadge status={vehicle.status}>
                    {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                  </StatusBadge>
                </td>
                <td className="center">
                  {vehicle.id === activeVehicleId ? <FaCheck color="green" /> : <FaTimes color="#999" />}
                </td>
                <td>
                  <ActionButtons>
                    <ActionButton
                      onClick={() => onSelect(vehicle.id)}
                      title="Edit vehicle"
                    >
                      <FaEdit />
                    </ActionButton>
                    
                    {vehicle.id !== activeVehicleId && (
                      <ActionButton
                        onClick={() => onSetActive(vehicle.id)}
                        className="activate"
                        title="Set as active vehicle"
                      >
                        <FaCheck />
                      </ActionButton>
                    )}
                    
                    <ActionButton
                      onClick={() => onDelete(vehicle.id)}
                      className="delete"
                      title="Delete vehicle"
                    >
                      <FaTrash />
                    </ActionButton>
                  </ActionButtons>
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

const VehicleListHeader = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  
  h3 {
    margin: 0;
    color: #333;
  }
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

const ActionButtons = styled.div`
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #555;
  border: none;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #e0e0e0;
  }
  
  &.delete:hover {
    background: #ffebee;
    color: #d32f2f;
  }
  
  &.activate:hover {
    background: #e8f5e9;
    color: #2e7d32;
  }
`;