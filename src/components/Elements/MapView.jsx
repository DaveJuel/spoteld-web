import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";

const decodePolyline = (encoded) => {
  if (!encoded) return [];
  
  const points = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    
    const dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    
    const dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push([lat * 1e-5, lng * 1e-5]);
  }

  return points;
};

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
  })
};

export default function MapView({ formData, onMapClick }) {
  const [routes, setRoutes] = useState([]);

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

  const fetchRoute = async (start, end) => {
    if (!start || !end) {
      return { coordinates: [], distance: 0, duration: 0 };
    }
    try {
      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.REACT_APP_ORS_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            coordinates: [
              [start.longitude, start.latitude],
              [end.longitude, end.latitude],
            ],
          }),
        }
      );

      const data = await response.json();

      if (data && data.routes && data.routes.length > 0) {
        const encodedPolyline = data.routes[0].geometry;
        const decodedRoute = decodePolyline(encodedPolyline);
        const summary = data.routes[0].summary || {};
        return {
          coordinates: decodedRoute,
          distance: summary.distance, // in meters
          duration: summary.duration  // in seconds
        };
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
    return { coordinates: [], distance: 0, duration: 0 };
  };

  useEffect(() => {
    const getRoutes = async () => {
      let newRoutes = [];
      
      if (formData.currentLocation && formData.pickUpLocation) {
        const route1Data = await fetchRoute(
          formData.currentLocation,
          formData.pickUpLocation
        );
        
        if (route1Data.coordinates.length > 0) {
          newRoutes.push({
            ...route1Data,
            type: 'toPickUp',
            color: "#3388ff", // Blue for current to pickup
            weight: 4,
            opacity: 0.8,
            label: "Route to pickup location"
          });
        }
      }
      
      if (formData.pickUpLocation && formData.dropOffLocation) {
        const route2Data = await fetchRoute(
          formData.pickUpLocation,
          formData.dropOffLocation
        );
        
        if (route2Data.coordinates.length > 0) {
          newRoutes.push({
            ...route2Data,
            type: 'toDropOff',
            color: "#ff4500", // Red-orange for pickup to drop-off
            weight: 4,
            opacity: 0.8,
            label: "Route to drop-off location"
          });
        }
      }
      
      setRoutes(newRoutes);
    };
    
    getRoutes();
  }, [formData]);

  // Format time from seconds to minutes and seconds
  const formatTime = (seconds) => {
    if (!seconds) return "0 min";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins > 0 ? `${mins} min${mins !== 1 ? 's' : ''}` : `${secs} sec`;
  };

  // Format distance from meters to km/miles
  const formatDistance = (meters) => {
    if (!meters) return "0 km";
    const km = (meters / 1000).toFixed(1);
    return `${km} km`;
  };

  // Get marker positions and assign appropriate icons
  const markers = [];
  if (formData.currentLocation) {
    markers.push({
      position: [formData.currentLocation.latitude, formData.currentLocation.longitude],
      icon: markerIcons.current,
      tooltip: "Current Location",
      type: "current"
    });
  }
  
  if (formData.pickUpLocation) {
    markers.push({
      position: [formData.pickUpLocation.latitude, formData.pickUpLocation.longitude],
      icon: markerIcons.pickup,
      tooltip: "Pick-up Location",
      type: "pickup"
    });
  }
  
  if (formData.dropOffLocation) {
    markers.push({
      position: [formData.dropOffLocation.latitude, formData.dropOffLocation.longitude],
      icon: markerIcons.dropoff,
      tooltip: "Drop-off Location",
      type: "dropoff"
    });
  }

  // Set initial map center based on first available position
  const initialCenter = markers.length > 0 
    ? markers[0].position 
    : [51.505, -0.09];

  return (
    <MapWrapper>
      <MapContainer
        center={initialCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <HandleMapClick />

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
              opacity: route.opacity
            }}
          >
            <Tooltip sticky>
              {route.label}<br />
              Distance: {formatDistance(route.distance)}<br />
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
                  {formatDistance(route.distance)} | {formatTime(route.duration)}
                </div>
              </div>
            </RouteItem>
          ))}
          <TotalInfo>
            Total: {formatDistance(routes.reduce((sum, route) => sum + route.distance, 0))} | {" "}
            {formatTime(routes.reduce((sum, route) => sum + route.duration, 0))}
          </TotalInfo>
        </RouteInfo>
      )}
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const RouteInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  z-index: 1000;
  
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 16px;
  }
`;

const RouteItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  
  .route-stats {
    font-size: 12px;
    color: #666;
  }
`;

const RouteColorIndicator = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 8px;
`;

const TotalInfo = styled.div`
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #eee;
  font-weight: bold;
`;