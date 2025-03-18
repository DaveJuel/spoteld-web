import React, { useState } from "react";
import MapView from "../components/Elements/MapView";
import MainLayout from "../components/Layout/MainLayout";
import { MapContainer } from "react-leaflet";
import {
  InfoItem,
  InfoLabel,
  InfoValue,
  NoSelection,
  NotesSection,
  RouteDetails,
  RoutePoint,
  StatusBadge,
  TripDate,
  TripDetails,
  TripDistance,
  TripHeader,
  TripInfoGrid,
  TripItem,
  TripName,
  TripStatus,
} from "../style/trips.styles";
import { FilterContainer, LeftSectionContainer, LeftSectionHeader } from "../style/view.styles";

export default function Trips() {
  const [selectedTrip, setSelectedTrip] = useState(null);

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
      notes: "Delivered on time. No issues reported.",
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
      notes: "Delayed due to traffic near Gary.",
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
      notes: "High-priority delivery.",
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
      notes: "Delivered ahead of schedule.",
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
      notes: "Temperature controlled cargo.",
    },
  ];

  // Create the left content (trip list)
  const leftContent = (
    <LeftSectionContainer >
      <LeftSectionHeader >
        <h2>My Trips</h2>
        <FilterContainer>
          <select defaultValue="all">
            <option value="all">All Trips</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </FilterContainer>
      </LeftSectionHeader>
      {tripsData.map((trip) => (
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
    </LeftSectionContainer>
  );

  // Create the right content (trip details and map)
  const rightContent = selectedTrip ? (
    <TripDetails>
      <TripHeader>
        <h1>{selectedTrip.name}</h1>
        <StatusBadge status={selectedTrip.status}>
          {selectedTrip.status}
        </StatusBadge>
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
        <RoutePoint type="start">
          {selectedTrip.startLocation}
        </RoutePoint>
        {selectedTrip.stops.map((stop, index) => (
          <RoutePoint key={index} type="stop">
            {stop}
          </RoutePoint>
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
      <p>
        Choose a trip from the list on the left to view its details.
      </p>
    </NoSelection>
  );

  return (
    <MainLayout
      leftContent={leftContent}
      rightContent={rightContent}
      initialSidebarWidth={240}
      initialSidebarState={true}
    />
  );
}