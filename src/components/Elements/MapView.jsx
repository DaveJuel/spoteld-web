import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { fetchRoute, HandleMapClick } from "../../utils/MapDecoder";
import {
  MapWrapper,
  RouteColorIndicator,
  RouteInfo,
  RouteItem,
  TotalInfo,
} from "../../style/map.styles";

// Custom marker icons
const markerIcons = {
  current: L.icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  pickup: L.icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
  dropoff: L.icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-orange.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  }),
};

export default function MapView({ mapData, onMapClick, searchLocationQuery }) {
  const [routes, setRoutes] = useState([]);
  const mapRef = useRef(null);

  const handleMapSearch = async (query) => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const results = await response.json();

      if (results.length > 0) {
        const { lat, lon } = results[0];
        const map = mapRef.current;

        if (map) {
          map.setView([lat, lon], 13); // Zoom level 13 for a good view
        }
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const SetMapRef = () => {
    const map = useMap();
    mapRef.current = map;
    return null;
  };

  useEffect(() => {
    if (searchLocationQuery) {
      handleMapSearch(searchLocationQuery);
  }
  }, [searchLocationQuery]);

  useEffect(() => {
    const getRoutes = async () => {
      let newRoutes = [];

      if (mapData.currentLocation && mapData.pickUpLocation) {
        const route1Data = await fetchRoute(
          mapData.currentLocation,
          mapData.pickUpLocation
        );

        if (route1Data.coordinates.length > 0) {
          newRoutes.push({
            ...route1Data,
            type: "toPickUp",
            color: "#3388ff",
            weight: 4,
            opacity: 0.8,
            label: "Route to pickup location",
          });
        }
      }

      if (mapData.pickUpLocation && mapData.dropOffLocation) {
        const route2Data = await fetchRoute(
          mapData.pickUpLocation,
          mapData.dropOffLocation
        );

        if (route2Data.coordinates.length > 0) {
          newRoutes.push({
            ...route2Data,
            type: "toDropOff",
            color: "#ff4500", // Red-orange for pickup to drop-off
            weight: 4,
            opacity: 0.8,
            label: "Route to drop-off location",
          });
        }
      }

      setRoutes(newRoutes);
    };

    getRoutes();
  }, [mapData]);

  // Format time from seconds to minutes and seconds
  const formatTime = (seconds) => {
    if (!seconds) return "0 min";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins > 0 ? `${mins} min${mins !== 1 ? "s" : ""}` : `${secs} sec`;
  };

  // Format distance from meters to km/miles
  const formatDistance = (meters) => {
    if (!meters) return "0 km";
    const km = (meters / 1000).toFixed(1);
    return `${km} km`;
  };

  // Get marker positions and assign appropriate icons
  const markers = [];
  if (mapData?.currentLocation && mapData?.currentLocation?.latitude) {
    markers.push({
      position: [
        mapData.currentLocation.latitude,
        mapData.currentLocation.longitude,
      ],
      icon: markerIcons.current,
      tooltip: "Current Location",
      type: "current",
    });
  }

  if (mapData?.pickUpLocation && mapData?.pickUpLocation?.latitude) {
    markers.push({
      position: [
        mapData.pickUpLocation.latitude,
        mapData.pickUpLocation.longitude,
      ],
      icon: markerIcons.pickup,
      tooltip: "Pick-up Location",
      type: "pickup",
    });
  }

  if (mapData?.dropOffLocation &&mapData?.dropOffLocation?.latitude) {
    markers.push({
      position: [
        mapData.dropOffLocation.latitude,
        mapData.dropOffLocation.longitude,
      ],
      icon: markerIcons.dropoff,
      tooltip: "Drop-off Location",
      type: "dropoff",
    });
  }

  // Set initial map center based on first available position
  const initialCenter =
    markers.length > 0 ? markers[0].position : [51.505, -0.09];

  return (
    <MapWrapper>
      <MapContainer
        center={initialCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <SetMapRef />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {onMapClick && <HandleMapClick onMapClick={onMapClick} />}

        {markers.map((marker, index) => (
          <Marker
            key={`marker-${marker.type}-${index}`}
            position={marker.position}
            icon={marker.icon}
          >
            <Tooltip permanent={false} direction="top">
              {marker.tooltip}
            </Tooltip>
          </Marker>
        ))}

        {routes.map((route, index) => (
          <Polyline
            key={`route-${route.type}-${index}`}
            positions={route.coordinates}
            pathOptions={{
              color: route.color,
              weight: route.weight,
              opacity: route.opacity,
            }}
          >
            <Tooltip sticky>
              {route.label}
              <br />
              Distance: {formatDistance(route.distance)}
              <br />
              Duration: {formatTime(route.duration)}
            </Tooltip>
          </Polyline>
        ))}
      </MapContainer>

      {routes.length > 0 && (
        <RouteInfo>
          <h3>Trip Information</h3>
          {routes.map((route, index) => (
            <RouteItem key={`info-${route.type}-${index}`}>
              <RouteColorIndicator color={route.color} />
              <div>
                <div>{route.label}</div>
                <div className="route-stats">
                  {formatDistance(route.distance)} |{" "}
                  {formatTime(route.duration)}
                </div>
              </div>
            </RouteItem>
          ))}
          <TotalInfo>
            Total:{" "}
            {formatDistance(
              routes.reduce((sum, route) => sum + route.distance, 0)
            )}{" "}
            |{" "}
            {formatTime(routes.reduce((sum, route) => sum + route.duration, 0))}
          </TotalInfo>
        </RouteInfo>
      )}
    </MapWrapper>
  );
}
