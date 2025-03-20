import React, { useEffect, useState } from "react";
// import MapView from "../components/Elements/MapView";
import MainLayout from "../components/Layout/MainLayout";
import {
  LocationIcon,
  NoSelection,
  TripDate,
  TripHeader,
  TripId,
  TripInfo,
  TripItem,
  TripName,
  TripRoute,
  TripShipment,
  TripStatus,
  TripTime,
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
        trips.map((trip) => {
          // Format date for better display
          const tripDate = new Date(trip.start_date);
          const formattedDate = tripDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });

          // Default status if not available
          const status = trip.status || "Scheduled";

          return (
            <TripItem
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              isSelected={selectedTrip && selectedTrip.id === trip.id}
            >
              <TripHeader>
                <TripId>Trip #{trip.id}</TripId>
                <TripStatus status={status}>{status}</TripStatus>
              </TripHeader>

              <TripRoute>
                <LocationIcon>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="4" fill="#4CAF50" />
                  </svg>
                </LocationIcon>
                <TripName>
                  {trip.pickup_location.address_line},{" "}
                  {trip.pickup_location.city}
                </TripName>
              </TripRoute>

              <TripRoute>
                <LocationIcon>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="4" fill="#F44336" />
                  </svg>
                </LocationIcon>
                <TripName>
                  {trip.dropoff_location.address_line},{" "}
                  {trip.dropoff_location.city}
                </TripName>
              </TripRoute>

              <TripInfo>
                <TripDate>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 2V6"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 2V6"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 10H21"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {formattedDate}
                </TripDate>
                <TripTime>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {trip.start_time}
                </TripTime>
                <TripShipment>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 16V4H8V16"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 20H20"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 8H8"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 12H20"
                      stroke="#666"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Shipment #{trip.shipment}
                </TripShipment>
              </TripInfo>
            </TripItem>
          );
        })}
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
