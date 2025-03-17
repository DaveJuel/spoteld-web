import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";

export default function MapView({ formData, onMapClick }) {
  const HandleMapClick = () => {
    useMapEvents({
      click: async (e) => {
        if (!e.latlng) return;

        const { lat, lng } = e.latlng;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );

          if (!response.ok) throw new Error("Failed to fetch location details");

          const data = await response.json();

          const location = {
            address_line:
              data.address.road || data.display_name || "Unknown Road",
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "Unknown City",
            country: data.address.country || "Unknown Country",
            longitude: lng,
            latitude: lat,
          };

          onMapClick(location);
        } catch (error) {
          console.error("Error fetching location details:", error);
        }
      },
    });
    return null; 
  };

  const positions = [];
  if (formData.currentLocation)
    positions.push([
      formData.currentLocation.latitude,
      formData.currentLocation.longitude,
    ]);
  if (formData.pickUpLocation)
    positions.push([
      formData.pickUpLocation.latitude,
      formData.pickUpLocation.longitude,
    ]);
  if (formData.dropOffLocation)
    positions.push([
      formData.dropOffLocation.latitude,
      formData.dropOffLocation.longitude,
    ]);

  return (
    <MapWrapper>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <HandleMapClick />

        {positions.map((position, index) => (
          <Marker
            key={index}
            position={position}
            icon={L.icon({
              iconUrl:
                "https://leafletjs.com/examples/custom-icons/leaf-green.png",
              iconSize: [25, 41],
            })}
          />
        ))}

        {formData.currentLocation && formData.pickUpLocation && (
          <Polyline
            positions={[
              [
                formData.currentLocation.latitude,
                formData.currentLocation.longitude,
              ],
              [
                formData.pickUpLocation.latitude,
                formData.pickUpLocation.longitude,
              ],
            ]}
            color="blue"
          />
        )}

        {formData.pickUpLocation && formData.dropOffLocation && (
          <Polyline
            positions={[
              [
                formData.pickUpLocation.latitude,
                formData.pickUpLocation.longitude,
              ],
              [
                formData.dropOffLocation.latitude,
                formData.dropOffLocation.longitude,
              ],
            ]}
            color="green"
          />
        )}
      </MapContainer>
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;
