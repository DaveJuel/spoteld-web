import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import styled from "styled-components";

export default function MapView() {
  return (
    <MapWrapper>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;
