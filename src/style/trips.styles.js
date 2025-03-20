

import styled from "styled-components";

export const TripItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.isSelected ? '#f0f7ff' : 'white'};
  border-left: 4px solid ${props => props.isSelected ? '#1976d2' : 'transparent'};
  &:hover {
    background: ${props => props.isSelected ? '#f0f7ff' : '#f5f5f5'};
  }
`;

export const TripHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const TripId = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #666;
  background: #f1f1f1;
  padding: 3px 8px;
  border-radius: 4px;
`;

export const TripRoute = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const LocationIcon = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

export const TripName = styled.h3`
  margin: 0;
  color: #333;
  font-size: 15px;
  font-weight: 500;
`;

export const TripInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
`;

export const TripDate = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  color: #666;
  font-size: 13px;
  
  svg {
    margin-right: 4px;
  }
`;

export const TripTime = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  color: #666;
  font-size: 13px;
  
  svg {
    margin-right: 4px;
  }
`;

export const TripShipment = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 13px;
  
  svg {
    margin-right: 4px;
  }
`;

export const TripStatus = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'Completed': return '#e6f7e6';
      case 'In Progress': return '#fff7e6';
      case 'Scheduled': return '#e6f0ff';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'Completed': return '#2e7d32';
      case 'In Progress': return '#ed6c02';
      case 'Scheduled': return '#0d47a1';
      default: return '#333';
    }
  }};
`;

export const TripDetails = styled.div`
  background: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const TripDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h1 {
    margin: 0;
    color: #333;
  }
`;

export const StatusBadge = styled.div`
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'Completed': return '#e6f7e6';
      case 'In Progress': return '#fff7e6';
      case 'Scheduled': return '#e6f0ff';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'Completed': return '#2e7d32';
      case 'In Progress': return '#ed6c02';
      case 'Scheduled': return '#0d47a1';
      default: return '#333';
    }
  }};
`;

export const TripInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

export const InfoItem = styled.div`
  padding: 15px;
  background: #f9f9f9;
  border-radius: 6px;
`;

export const InfoLabel = styled.p`
  margin: 0 0 5px 0;
  color: #666;
  font-size: 14px;
`;

export const InfoValue = styled.p`
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: 500;
`;

export const RouteDetails = styled.div`
  margin-bottom: 30px;
  
  h3 {
    margin: 0 0 15px 0;
    color: #333;
  }
`;

export const RoutePoint = styled.div`
  position: relative;
  padding: 10px 10px 10px 40px;
  margin-bottom: 10px;
  
  &:before {
    content: '';
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => {
      switch(props.type) {
        case 'start': return '#4caf50';
        case 'end': return '#f44336';
        default: return '#2196f3';
      }
    }};
  }
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    left: 20px;
    top: 50%;
    height: 100%;
    width: 2px;
    background: #ddd;
  }
`;

export const NotesSection = styled.div`
  margin-bottom: 30px;
  
  h3 {
    margin: 0 0 15px 0;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #666;
    line-height: 1.5;
  }
`;

export const MapContainer = styled.div`
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

export const NoSelection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  color: #666;
  
  h2 {
    margin: 0 0 10px 0;
  }
  
  p {
    margin: 0;
    max-width: 400px;
  }
`;