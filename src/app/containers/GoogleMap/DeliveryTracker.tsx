import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

enum TravelMode {
  DRIVING = "DRIVING",
  WALKING = "WALKING",
  BICYCLING = "BICYCLING",
  TRANSIT = "TRANSIT",
}



const DeliveryTracker = () => {
  const [map, setMap] = useState<any>(null);
  const [origin, setOrigin] = useState<any>(null);
  const [destination, setDestination] = useState<any>({
    lat: 8.9810,
    lng: 79.9044,
  }); // San Francisco as an example
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  // Get the user's current location and set it as the origin
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error(error)
    );
  }, []);

  // Update the directions when the origin or destination changes
  useEffect(() => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin,
          destination,
          travelMode: TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [origin, destination]);

  // Update the map center to the user's current location when the origin changes
  useEffect(() => {
    if (map && origin) {
      map.panTo(origin);
    }
  }, [map, origin]);

  // Update the origin periodically to simulate the delivery vehicle's movement
  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate movement to the right by updating the longitude
      setOrigin((prevOrigin:any) => ({
        lat: prevOrigin!.lat,
        lng: prevOrigin!.lng + 0.01,
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <GoogleMap center={origin} zoom={13} onLoad={(map) => setMap(map)}>
      {origin && (
        <DirectionsService
          options={{
            origin,
            destination,
            travelMode: TravelMode.DRIVING,
          }}
          callback={(result, status) => {
            if (status === "OK") {
              setDirections(result);
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }}
        />
      )}

      {directions && <DirectionsRenderer directions={directions} />}

      {origin && (
        <Marker
          position={origin}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new window.google.maps.Size(32, 32),
          }}
        />
      )}

      {destination && (
        <Marker
          position={destination}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new window.google.maps.Size(32, 32),
          }}
        />
      )}
    </GoogleMap>
  );
}

export default DeliveryTracker;
