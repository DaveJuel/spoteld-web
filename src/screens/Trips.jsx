import React, { useEffect, useState } from "react";
// import MapView from "../components/Elements/MapView";
import MainLayout from "../components/Layout/MainLayout";
import { MapContainer } from "react-leaflet";
import {
  InfoItem,
  InfoLabel,
  InfoValue,
  NoSelection,
  // NotesSection,
  RouteDetails,
  RoutePoint,
  StatusBadge,
  TripDate,
  TripDetails,
  // TripDistance,
  TripHeader,
  TripInfoGrid,
  TripItem,
  TripName,
  TripStatus,
} from "../style/trips.styles";
import {
  FilterContainer,
  LeftSectionContainer,
  LeftSectionHeader,
} from "../style/view.styles";
import LoadingSpinner from "../components/Elements/LoadingSpinner";
import { makeApiRequest } from "../utils/RequestHandler";

export default function Trips() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await makeApiRequest("/api/trip/all", "GET", null);
        setTrips(response.trips || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Create the left content (trip list)
  const leftContent = (
    <LeftSectionContainer>
      <LeftSectionHeader>
        <h2>Saved Trips</h2>
        <FilterContainer>
          <select defaultValue="all">
            <option value="all">All Trips</option>
            <option value="completed">Completed</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </FilterContainer>
      </LeftSectionHeader>
      {loading && <LoadingSpinner />}
      {!loading &&
        trips.map((trip) => (
          <TripItem
            key={trip.id}
            onClick={() => setSelectedTrip(trip)}
            isSelected={selectedTrip && selectedTrip.id === trip.id}
          >
            <TripName>From: {trip.pickup_location.address_line} </TripName>
            <TripName>To: {trip.dropoff_location.address_line} </TripName>
            <TripDate>{trip.start_date}</TripDate>
            {/* <TripDistance>{trip.distance}</TripDistance> */}
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
        {/* <InfoItem>
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
        </InfoItem> */}
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
        <RoutePoint type="start">{selectedTrip.pickup_location.address_line}</RoutePoint>
        {/* {selectedTrip.stops.map((stop, index) => (
          <RoutePoint key={index} type="stop">
            {stop}
          </RoutePoint>
        ))} */}
        <RoutePoint type="end">{selectedTrip.dropoff_location.address_line}</RoutePoint>
      </RouteDetails>

      {/* <NotesSection>
        <h3>Notes</h3>
        <p>{selectedTrip.notes}</p>
      </NotesSection> */}

      <MapContainer>
        {/* <MapView tripData={selectedTrip} /> */}
      </MapContainer>
    </TripDetails>
  ) : (
    <NoSelection>
      <h2>Select a trip to view details</h2>
      <p>Choose a trip from the list on the left to view its details.</p>
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
