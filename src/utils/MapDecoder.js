import { useMapEvents } from "react-leaflet";

export const decodePolyline = (encoded) => {
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

const isValidCountryCode = (code) => /^[A-Z]{2}$/.test(code);

export const HandleMapClick = ({onMapClick}) => {
    useMapEvents ({
      click: async (e) => {
        if (!e.latlng) return;

        const { lat, lng } = e.latlng;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );

          if (!response.ok) throw new Error("Failed to fetch location details");

          const data = await response.json();

          const countryCode = data.address.country_code?.toUpperCase() || "US";
          const validCountry = isValidCountryCode(countryCode) ? countryCode : "US";
  

          const location = {
            address_line:
              data.address.road || data.display_name || "Unknown Road",
            city:
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "Unknown City",
            country: validCountry || "Unknown Country",
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

export const fetchRoute = async (start, end) => {
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
