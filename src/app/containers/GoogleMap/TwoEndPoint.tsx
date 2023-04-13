import React, { FC, useCallback, useState } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import ReactDOMServer from 'react-dom/server';
import { useLoadScript } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa'
// const defaultOptions = {
//   destination: 'Mannar, Sri Lanka',
//   origin: 'Vavuniya, Sri Lanka',
//   travelMode: google.maps.TravelMode.DRIVING,
// };
const mapStyles = [  
  {    
    featureType: "administrative",    
    elementType: "labels.text.fill",    
    stylers: [{ color: "#444444" }]
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [{ color: "#f2f2f2" }]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{visibility: "on" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#dddddd" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#444444" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#cccccc" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#444444" }]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#cccccc" }]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [{ color: "#444444" }]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [{ color: "#a6cbe3" }, { visibility: "on" }]
  }
];

export interface MapWithDirectionsProps {
    defaultOptions: any
    // originMarker?: any,
    // destinationMarker?: any
}



const MapWithDirections:FC <MapWithDirectionsProps> = React.memo(({defaultOptions}) => {
    const [directions, setDirections] = useState(null);
    const [directionsError, setDirectionsError] = useState(false);
  
    const onDirectionsCallback = useCallback((result:any, status:any) => {
      if (status === 'OK' && result !== null) {
        setDirections(result);
        setDirectionsError(false);
      } else {
        setDirectionsError(true);
      }
    }, []);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDUKgGWyiP8pUtLzm2f7ajBoBAIoehkV-A'
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;
    return (
      <GoogleMap
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={10}
        mapContainerStyle={{ height: '400px', width: '100%', borderRadius: '10px'}}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        <DirectionsService
          options={defaultOptions}
          callback={onDirectionsCallback}
        />
        {directionsError && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <p className="bg-gray-800 rounded-xl pt-2 pb-2 px-4 font-semibold text-white" >No route found !</p>
          </div>
        )}
        {directions && (
          <DirectionsRenderer 
          directions={directions} 
          options={{
            // suppressMarkers: true,
            markerOptions: {
              icon: {
                scaledSize: new google.maps.Size(30, 30),
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
                  ReactDOMServer.renderToString(<FaMapMarkerAlt color="#ff0000" />)
                ),
              },
            },
            polylineOptions: {
              strokeColor: "#4d4d4d",
              strokeWeight: 3,
            },
          }}
        />
        )}
         {/* add origin marker */}
      {/* {originMarker && (
        <Marker
          position={{ lat: originMarker.lat, lng: originMarker.lng }}
          icon={{
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
              ReactDOMServer.renderToString(<FaMapMarkerAlt color="#00ff00" />)
            ),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      )}

      {/* add destination marker */}
      {/* {destinationMarker && (
        <Marker
          position={{ lat: destinationMarker.lat, lng: destinationMarker.lng }}
          icon={{
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
              ReactDOMServer.renderToString(<FaMapMarkerAlt color="#ff0000" />)
            ),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      )} */} 
      </GoogleMap>
    );
  });
  

export default MapWithDirections;
