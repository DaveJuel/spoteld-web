import React, { useState } from "react";
import styled from "styled-components";
import SidebarNav from "../components/Nav/Sidebar";
import MapView from "../components/Elements/MapView";

export default function Trips() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Function to handle sidebar state changes
  const handleSidebarChange = (isOpen, width) => {
    setSidebarOpen(isOpen);
    setSidebarWidth(width);
  };

  // Dummy trip data
  const tripsData = [
    { 
      id: 1, 
      name: "New York to Boston", 
      date: "2025-03-10", 
      distance: "215 miles",
      duration: "4h 30m",
      status: "Completed",
      driver: "John Doe",
      carrier: "Fast Logistics",
      startLocation: "New York, NY",
      endLocation: "Boston, MA",
      stops: ["Hartford, CT", "Worcester, MA"],
      notes: "Delivered on time. No issues reported."
    },
    { 
      id: 2, 
      name: "Chicago to Detroit", 
      date: "2025-03-12", 
      distance: "283 miles",
      duration: "5h 45m",
      status: "In Progress",
      driver: "Jane Smith",
      carrier: "Mid-West Transport",
      startLocation: "Chicago, IL",
      endLocation: "Detroit, MI",
      stops: ["Gary, IN", "Kalamazoo, MI"],
      notes: "Delayed due to traffic near Gary."
    },
    { 
      id: 3, 
      name: "Los Angeles to San Francisco", 
      date: "2025-03-15", 
      distance: "382 miles",
      duration: "7h 20m",
      status: "Scheduled",
      driver: "Alex Johnson",
      carrier: "West Coast Shipping",
      startLocation: "Los Angeles, CA",
      endLocation: "San Francisco, CA",
      stops: ["Bakersfield, CA", "Fresno, CA"],
      notes: "High-priority delivery."
    },
    { 
      id: 4, 
      name: "Seattle to Portland", 
      date: "2025-03-08", 
      distance: "175 miles",
      duration: "3h 15m",
      status: "Completed",
      driver: "Mike Wilson",
      carrier: "Pacific Northwest Logistics",
      startLocation: "Seattle, WA",
      endLocation: "Portland, OR",
      stops: ["Olympia, WA", "Longview, WA"],
      notes: "Delivered ahead of schedule."
    },
    { 
      id: 5, 
      name: "Miami to Orlando", 
      date: "2025-03-16", 
      distance: "236 miles",
      duration: "4h 15m",
      status: "Scheduled",
      driver: "Sarah Davis",
      carrier: "Sunshine Transport",
      startLocation: "Miami, FL",
      endLocation: "Orlando, FL",
      stops: ["Fort Lauderdale, FL", "West Palm Beach, FL"],
      notes: "Temperature controlled cargo."
    }
  ];

  return (
    <MainContainer>
      <SidebarNav
        onStateChange={handleSidebarChange}
        sidebarOpen={sidebarOpen}
      />
      <ContentWrapper sidebarWidth={sidebarWidth}>
        <LeftSection>
          <TripsList>
            <TripListHeader>
              <h2>My Trips</h2>
              <FilterContainer>
                <select defaultValue="all">
                  <option value="all">All Trips</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </FilterContainer>
            </TripListHeader>
            {tripsData.map(trip => (
              <TripItem 
                key={trip.id} 
                onClick={() => setSelectedTrip(trip)}
                isSelected={selectedTrip && selectedTrip.id === trip.id}
              >
                <TripName>{trip.name}</TripName>
                <TripDate>{trip.date}</TripDate>
                <TripDistance>{trip.distance}</TripDistance>
                <TripStatus status={trip.status}>{trip.status}</TripStatus>
              </TripItem>
            ))}
          </TripsList>
        </LeftSection>
        <RightSection>
          {selectedTrip ? (
            <TripDetails>
              <TripHeader>
                <h1>{selectedTrip.name}</h1>
                <StatusBadge status={selectedTrip.status}>{selectedTrip.status}</StatusBadge>
              </TripHeader>
              
              <TripInfoGrid>
                <InfoItem>
                  <InfoLabel>Date</InfoLabel>
                  <InfoValue>{selectedTrip.date}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Distance</InfoLabel>
                  <InfoValue>{selectedTrip.distance}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Duration</InfoLabel>
                  <InfoValue>{selectedTrip.duration}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Driver</InfoLabel>
                  <InfoValue>{selectedTrip.driver}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Carrier</InfoLabel>
                  <InfoValue>{selectedTrip.carrier}</InfoValue>
                </InfoItem>
              </TripInfoGrid>
              
              <RouteDetails>
                <h3>Route Details</h3>
                <RoutePoint type="start">{selectedTrip.startLocation}</RoutePoint>
                {selectedTrip.stops.map((stop, index) => (
                  <RoutePoint key={index} type="stop">{stop}</RoutePoint>
                ))}
                <RoutePoint type="end">{selectedTrip.endLocation}</RoutePoint>
              </RouteDetails>
              
              <NotesSection>
                <h3>Notes</h3>
                <p>{selectedTrip.notes}</p>
              </NotesSection>
              
              <MapContainer>
                <MapView tripData={selectedTrip} />
              </MapContainer>
            </TripDetails>
          ) : (
            <NoSelection>
              <h2>Select a trip to view details</h2>
              <p>Choose a trip from the list on the left to view its details.</p>
            </NoSelection>
          )}
        </RightSection>
      </ContentWrapper>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f4f8;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 0;
  gap: 20px;
  transition: all 0.3s ease;
  margin-left: 0;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  min-width: 300px;
  max-width: 450px;
  height: 100%;
  border-right: 1px solid #ddd;
  background: white;
`;

const TripsList = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const TripListHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  
  h2 {
    margin: 0 0 10px 0;
    color: #333;
  }
`;

const FilterContainer = styled.div`
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #f9f9f9;
  }
`;

const TripItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.2s;
  background: ${props => props.isSelected ? '#f0f7ff' : 'white'};
  
  &:hover {
    background: ${props => props.isSelected ? '#f0f7ff' : '#f5f5f5'};
  }
`;

const TripName = styled.h3`
  margin: 0 0 5px 0;
  color: #333;
  font-size: 16px;
`;

const TripDate = styled.p`
  margin: 0 0 5px 0;
  color: #666;
  font-size: 14px;
`;

const TripDistance = styled.p`
  margin: 0 0 5px 0;
  color: #666;
  font-size: 14px;
`;

const TripStatus = styled.span`
  display: inline-block;
  padding: 3px 8px;
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

const RightSection = styled.div`
  flex: 2;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
`;

const TripDetails = styled.div`
  background: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const TripHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h1 {
    margin: 0;
    color: #333;
  }
`;

const StatusBadge = styled.div`
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

const TripInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  padding: 15px;
  background: #f9f9f9;
  border-radius: 6px;
`;

const InfoLabel = styled.p`
  margin: 0 0 5px 0;
  color: #666;
  font-size: 14px;
`;

const InfoValue = styled.p`
  margin: 0;
  color: #333;
  font-size: 16px;
  font-weight: 500;
`;

const RouteDetails = styled.div`
  margin-bottom: 30px;
  
  h3 {
    margin: 0 0 15px 0;
    color: #333;
  }
`;

const RoutePoint = styled.div`
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

const NotesSection = styled.div`
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

const MapContainer = styled.div`
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

const NoSelection = styled.div`
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