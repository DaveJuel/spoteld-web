import React from "react";
import MapView from "../Elements/MapView";
import DriverHoursOfService from "../Elements/DriverHoursOfService";
import {
  DailyLogContainer,
  HoursOfServiceSection,
  MapSection,
} from "../../style/daily.log.styles";

const DailyLogLayout = ({ formData, onMapClick, tripId }) => {
  return (
    <DailyLogContainer>
      <HoursOfServiceSection>
        <DriverHoursOfService tripId={tripId} />
      </HoursOfServiceSection>
      <MapSection>
        <MapView mapData={formData} onMapClick={onMapClick} />
      </MapSection>
    </DailyLogContainer>
  );
};

export default DailyLogLayout;
