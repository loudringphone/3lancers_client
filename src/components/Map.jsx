import React, { useState, useEffect} from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const Map = (props) => {
  const YOUR_API_KEY = process.env.REACT_APP_GOECODING_API;
  const mapLocation = props.mapLocation;

  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (mapLocation) {
      let geoCoding = `https://maps.googleapis.com/maps/api/geocode/json?address=${mapLocation}&key=${YOUR_API_KEY}`;
      fetch(geoCoding)
        .then((response) => response.json())
        .then((data) => setLocation(data.results[0].geometry.location))
        .catch((error) => console.log(error));
    }
  }, [mapLocation]);

  const containerStyle = {
    width: '400px',
    height: '200px',
    marginTop: '10px',
    marginBottom: '10px'
  };

  const center = {
    lat: location.lat,
    lng: location.lng
  };

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: YOUR_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(new window.google.maps.LatLng(center.lat + 0.1, center.lng + 0.1));
    bounds.extend(new window.google.maps.LatLng(center.lat - 0.1, center.lng - 0.1));
    map.fitBounds(bounds);
    const initialZoom = 2;
    setTimeout(() => {
      map.setZoom(initialZoom);
    }, 30);
  const targetZoom = 12;
  const increment = (targetZoom - initialZoom) / 10;
  let currentIncrement = 0;
  let currentZoom = initialZoom
  setTimeout(() => {
  const interval = setInterval(() => {
    currentIncrement = currentIncrement + 0.25
    currentZoom = initialZoom + currentIncrement * increment
    map.setZoom(currentZoom);
    
    if (parseInt(currentZoom) == targetZoom) {
      clearInterval(interval);
    }
  }, 100);
  }, 1000);
  
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (loadError) {
    return <div>There was an error loading the Google Maps API</div>;
  }

  return isLoaded && location.lat !== 0 && location.lng !== 0 ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ disableDefaultUI: true }}
    >
      <Marker position={center} />
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
  ) : (
    <div><br/>This site owner is missing an API key for <a href="https://developers.google.com/maps/documentation/javascript/get-api-key">Google Maps Platform</a> <br/>
    If you would like to sponsor them a key, here is their bank details: <br/>
    BSB 062-320 Account 1080 6600<br/><br/></div>
  );
};

export default React.memo(Map);
