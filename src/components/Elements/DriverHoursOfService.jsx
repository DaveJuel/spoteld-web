import React, { useState, useEffect } from "react";
import {
  DateDisplay,
  EldContainer,
  HoursTotal,
  LogSelector,
  LogSelectorContainer,
  LogSelectorLabel,
  RemarksHeader,
  RemarksRow,
  RemarksTotal,
  // StatusBar,
  StatusLabel,
  StatusRow,
  TimeCell,
  TimeHeader,
  Dot,
} from "../../style/driver.hos.styles";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";
import { makeApiRequest } from "../../utils/RequestHandler";

const DriverHoursOfService = ({ tripId }) => {
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLogIndex, setSelectedLogIndex] = useState(0);
  const [transformedLogs, setTransformedLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await makeApiRequest(
          `/api/trip/${tripId}/plan`,
          "GET",
          null
        );

        if (response && response.daily_logs && response.daily_logs.length > 0) {
          const logs = response.daily_logs.map((log) =>
            transformLogData(log, response.trip_id)
          );
          setTransformedLogs(logs);
          setDriverData(logs[0]);
        }
      } catch (err) {
        setError("Failed to load driver hours of service data");
        console.error("Error fetching driver data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tripId]);

  useEffect(() => {
    if (
      transformedLogs.length > 0 &&
      selectedLogIndex >= 0 &&
      selectedLogIndex < transformedLogs.length
    ) {
      setDriverData(transformedLogs[selectedLogIndex]);
    }
  }, [selectedLogIndex, transformedLogs]);

  const transformLogData = (dailyLog, tripId) => {
    const entries = dailyLog.entries || [];

    let offDutyHours = 0;
    let sleeperBerthHours = 0;
    let drivingHours = 0;
    let onDutyHours = 0;

    const statusChanges = [];
    // const locations = [];

    entries.forEach((entry) => {
      const startTimeParts = entry.start_time.split(":");
      const endTimeParts = entry.start_time.split(":");
      const startHour =
        parseInt(startTimeParts[0]) + parseInt(startTimeParts[1]) / 60;
      const endHour =
        parseInt(endTimeParts[0]) + parseInt(endTimeParts[1]) / 60;
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
    });

    const totalHours =
      offDutyHours + sleeperBerthHours + drivingHours + onDutyHours;

    const formattedDate = new Date(dailyLog.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      id: dailyLog.id || `log-${dailyLog.date}`,
      pro_shipping_no: tripId,
      offDutyHours: parseFloat(offDutyHours.toFixed(2)),
      sleeperBerthHours: parseFloat(sleeperBerthHours.toFixed(2)),
      drivingHours: parseFloat(drivingHours.toFixed(2)),
      onDutyHours: parseFloat(onDutyHours.toFixed(2)),
      totalHours: parseFloat(totalHours.toFixed(2)),
      statusChanges,
      date: dailyLog.date,
      formattedDate,
    };
  };

  const generateTimeHeaders = () => {
    const timeHeaders = [];
    timeHeaders.push(<TimeCell key="header-label"></TimeCell>);
    for (let i = 0; i < 24; i++) {
      // const label = i === 0 ? "Midnight" : i === 12 ? "Noon" : `${i}`;
      timeHeaders.push(<TimeCell key={`header-${i}`}>{i}</TimeCell>);
    }
    return timeHeaders;
  };

  const renderStatusDots = (statusType) => {
    if (!driverData || !driverData.statusChanges) return null;

    return driverData.statusChanges
      .filter((change) => change.status === statusType)
      .map((change, index) => {
        console.log("--------------");
        console.log(change);
        const left = (change.startHour / 24) * 100;
        console.log(left);

        const startDot = 129 + 21 * change.startHour;
        // const endDot = 129 + 21 * change.endHour;

        return (
          <>
            <Dot
              key={`${statusType}-${index}`}
              style={{
                left: `${startDot}px`,
              }}
            />
          </>
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
    <>
      <LogSelectorContainer>
        {transformedLogs.length > 1 && (
          <>
            <LogSelectorLabel>Select Log Date:</LogSelectorLabel>
            <LogSelector
              value={selectedLogIndex}
              onChange={(e) => setSelectedLogIndex(parseInt(e.target.value))}
            >
              {transformedLogs.map((log, index) => (
                <option key={log.id} value={index}>
                  {log.formattedDate}
                </option>
              ))}
            </LogSelector>
          </>
        )}
        <DateDisplay>{driverData.formattedDate}</DateDisplay>
      </LogSelectorContainer>

      <EldContainer>
        <TimeHeader>{timeHeaders}</TimeHeader>
        <StatusRow>
          <StatusLabel>Off Duty</StatusLabel>
          {renderStatusDots("offDuty")}
          <HoursTotal>{driverData.offDutyHours}</HoursTotal>
        </StatusRow>
        <StatusRow>
          <StatusLabel>Sleeper Berth</StatusLabel>
          {renderStatusDots("sleeperBerth")}
          <HoursTotal>{driverData.sleeperBerthHours}</HoursTotal>
        </StatusRow>
        <StatusRow>
          <StatusLabel>Driving</StatusLabel>
          {renderStatusDots("driving")}
          <HoursTotal>{driverData.drivingHours}</HoursTotal>
        </StatusRow>
        <StatusRow>
          <StatusLabel>On Duty</StatusLabel>
          {renderStatusDots("onDuty")}
          <HoursTotal>{driverData.onDutyHours}</HoursTotal>
        </StatusRow>
        <TimeHeader>{timeHeaders}</TimeHeader>
        <RemarksRow>
          <RemarksHeader>REMARKS</RemarksHeader>
          <RemarksTotal>={driverData.totalHours}</RemarksTotal>
        </RemarksRow>
      </EldContainer>
    </>
  );
};

export default DriverHoursOfService;
