import React, { useState, useEffect } from "react";
import {
  EldContainer,
  HoursTotal,
  RemarksHeader,
  RemarksRow,
  RemarksTotal,
  ShipmentInfo,
  StatusBar,
  StatusLabel,
  StatusRow,
  TimeCell,
  TimeHeader,
} from "../../style/driver.hos.styles";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";
import { makeApiRequest } from "../../utils/RequestHandler";

const DriverHoursOfService = ({ tripId }) => {
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await makeApiRequest(
          `/api/trip/${tripId}/plan`,
          "GET",
          null
        );
        const transformedData = transformApiData(response);
        setDriverData(transformedData);
      } catch (err) {
        setError("Failed to load driver hours of service data");
        console.error("Error fetching driver data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tripId]);

  // Transform API data to the format needed for rendering
  const transformApiData = (apiData) => {
    if (!apiData || !apiData.daily_logs || apiData.daily_logs.length === 0) {
      return null;
    }

    // For simplicity, we'll use the most recent daily log
    const dailyLog = apiData.daily_logs[0];
    const entries = dailyLog.entries || [];

    // Calculate totals for each activity type
    let offDutyHours = 0;
    let sleeperBerthHours = 0;
    let drivingHours = 0;
    let onDutyHours = 0;

    // Transform entries to status changes
    const statusChanges = [];
    const locations = [];

    entries.forEach((entry) => {
      // Parse times to hours since midnight
      const startTimeParts = entry.start_time.split(":");
      const endTimeParts = entry.end_time.split(":");

      const startHour =
        parseInt(startTimeParts[0]) + parseInt(startTimeParts[1]) / 60;
      const endHour =
        parseInt(endTimeParts[0]) + parseInt(endTimeParts[1]) / 60;

      // Map API activity to our status types
      let status;
      switch (entry.activity) {
        case "off duty":
          status = "offDuty";
          offDutyHours += entry.duration;
          break;
        case "sleeper berth":
          status = "sleeperBerth";
          sleeperBerthHours += entry.duration;
          break;
        case "driving":
          status = "driving";
          drivingHours += entry.duration;
          break;
        case "on duty":
          status = "onDuty";
          onDutyHours += entry.duration;
          break;
        default:
          status = "offDuty";
          offDutyHours += entry.duration;
      }

      statusChanges.push({ status, startHour, endHour });

      // Add location at the start time
      if (entry.location) {
        // Format address to show only the city name if possible
        let locationName = entry.location.address;

        // If it's coordinates, try to extract meaningful info
        if (locationName.startsWith("Coordinates:")) {
          locationName = `Location at ${entry.start_time}`;
        }

        locations.push({
          name: locationName,
          hour: startHour,
        });
      }

      // Add end location for driving entries
      if (entry.activity === "driving" && entry.end_location) {
        let locationName = entry.end_location.address;

        if (locationName.startsWith("Coordinates:")) {
          locationName = `Location at ${entry.end_time}`;
        }

        locations.push({
          name: locationName,
          hour: endHour,
        });
      }
    });

    const totalHours =
      offDutyHours + sleeperBerthHours + drivingHours + onDutyHours;

    return {
      pro_shipping_no: apiData.trip_id,
      offDutyHours: parseFloat(offDutyHours.toFixed(2)),
      sleeperBerthHours: parseFloat(sleeperBerthHours.toFixed(2)),
      drivingHours: parseFloat(drivingHours.toFixed(2)),
      onDutyHours: parseFloat(onDutyHours.toFixed(2)),
      totalHours: parseFloat(totalHours.toFixed(2)),
      statusChanges,
      locations,
      date: dailyLog.date,
    };
  };

  // Generate time headers
  const generateTimeHeaders = () => {
    const timeHeaders = [];
    timeHeaders.push(<TimeCell key="header-label"></TimeCell>);
    for (let i = 0; i < 24; i++) {
      if (i === 0) {
        timeHeaders.push(<TimeCell key={`header-${i}`}>Midnight</TimeCell>);
      } else if (i === 12) {
        timeHeaders.push(<TimeCell key={`header-${i}`}>Noon</TimeCell>);
      } else {
        timeHeaders.push(<TimeCell key={`header-${i}`}>{i}</TimeCell>);
      }
    }
    return timeHeaders;
  };

  // Function to render status bars
  const renderStatusBars = (statusType) => {
    if (!driverData || !driverData.statusChanges) return null;

    return driverData.statusChanges
      .filter((change) => change.status === statusType)
      .map((change, index) => {
        const startPercent = (change.startHour / 24) * 100;
        const width = ((change.endHour - change.startHour) / 24) * 100;
        return (
          <StatusBar
            key={`${statusType}-${index}`}
            style={{
              left: `calc(120px + ${startPercent}% * (100% - 120px) / 100)`,
              width: `calc(${width}% * (100% - 120px) / 100)`,
            }}
          />
        );
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !driverData) {
    return <EmptyState />;
  }

  const timeHeaders = generateTimeHeaders();

  return (
    <EldContainer>
      <ShipmentInfo>
        <div>Pro or Shipping No. {driverData.pro_shipping_no}</div>
        <div>Date: {driverData.date}</div>
      </ShipmentInfo>
      <TimeHeader>{timeHeaders}</TimeHeader>
      <StatusRow>
        <StatusLabel>Off Duty</StatusLabel>
        {renderStatusBars("offDuty")}
        <HoursTotal>{driverData.offDutyHours}</HoursTotal>
      </StatusRow>
      <StatusRow>
        <StatusLabel>Sleeper Berth</StatusLabel>
        {renderStatusBars("sleeperBerth")}
        <HoursTotal>{driverData.sleeperBerthHours}</HoursTotal>
      </StatusRow>
      <StatusRow>
        <StatusLabel>Driving</StatusLabel>
        {renderStatusBars("driving")}
        <HoursTotal>{driverData.drivingHours}</HoursTotal>
      </StatusRow>
      <StatusRow>
        <StatusLabel>On Duty</StatusLabel>
        {renderStatusBars("onDuty")}
        <HoursTotal>{driverData.onDutyHours}</HoursTotal>
      </StatusRow>
      <TimeHeader>{timeHeaders}</TimeHeader>
      <RemarksRow>
        <RemarksHeader>REMARKS</RemarksHeader>
        <RemarksTotal>={driverData.totalHours}</RemarksTotal>
      </RemarksRow>
    </EldContainer>
  );
};

export default DriverHoursOfService;
