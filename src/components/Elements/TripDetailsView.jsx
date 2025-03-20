import React, { useEffect, useState } from "react";
import MapView from "../Elements/MapView";
import DriverHoursOfService from "../Elements/DriverHoursOfService";
import {
  DailyLogContainer,
  HoursOfServiceSection,
  MapSection,
} from "../../style/daily.log.styles";

const TripDetailsView = ({ trip }) => {
  const [tripData, setTripData] = useState(null);
  useEffect(() => {
    if (trip) {
      const { current_location, pickup_location, dropoff_location } = trip;
      setTripData({
        currentLocation: current_location,
        pickUpLocation: pickup_location,
        dropOffLocation: dropoff_location,
      });
    }
  }, [trip]);

  return (
    <DailyLogContainer>
      {tripData && (
        <>
          <HoursOfServiceSection>
            <DriverHoursOfService tripId={trip.id} />
          </HoursOfServiceSection>
          <MapSection>
            <MapView mapData={tripData} />
          </MapSection>
        </>
      )}
    </DailyLogContainer>
  );
};

export default TripDetailsView;
