import React, { useEffect, useState } from "react";
import {
  LabelRow,
  Label,
  LocationFieldset,
} from "../../style/view.styles";
import { makeApiRequest } from "../../utils/RequestHandler";
import LoadingSpinner from "./LoadingSpinner";

const ConfirmTripForm = ({ tripId, shipmentDetails }) => {
  const [loading, setLoading] = useState(true);
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await makeApiRequest(
          `/api/trip/${tripId}/`,
          "GET",
          null
        );
        setTrip(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [tripId]);

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading && trip && (
        <>
          <LocationFieldset>
            <LabelRow>
              <Label htmlFor="startDate">Shipment No:</Label>
              <Label htmlFor="startDate">{shipmentDetails.shipment_no}</Label>
            </LabelRow>
          </LocationFieldset>

          <LocationFieldset>
            <LabelRow>
              <Label htmlFor="startTime">Drop off location:</Label>
              <Label htmlFor="startTime">
                {trip.dropoff_location.address_line}
              </Label>
            </LabelRow>
          </LocationFieldset>
        </>
      )}
    </>
  );
};

export default ConfirmTripForm;
