import React, { useEffect, useState } from "react";
// import MapView from "../components/Elements/MapView";
import MainLayout from "../components/Layout/MainLayout";
import {
  NoSelection,
  TripDate,
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
import TripDetailsView from "../components/Elements/TripDetailsView";

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
    <TripDetailsView trip={selectedTrip} />
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
