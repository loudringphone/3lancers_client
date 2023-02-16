import React, { useState, useEffect} from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';





const Map  = (props) => {


    const YOUR_API_KEY = process.env.REACT_APP_GOECODING_API;
    const mapLocation = props.mapLocation

    const [location, setLocation] = useState({lat: 0, lng: 0});
    useEffect(() => {
        if (mapLocation) {
        let geoCoding = `https://maps.googleapis.com/maps/api/geocode/json?address=${mapLocation}&key=${YOUR_API_KEY}`
        fetch(geoCoding)
          .then(response => response.json())
          .then(data => setLocation(data.results[0].geometry.location))
          .catch(error => console.log(error))
        }
      }, [mapLocation])

      useEffect(() => {
        if (location) {
        }
      }, [location]);
      console.log(location)

  


      const containerStyle = {
        width: '400px',
        height: '200px'
      };
      
      const center = {
        lat: location.lat,
        lng: location.lng
      };













  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: YOUR_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds();
bounds.extend(new window.google.maps.LatLng(center.lat + 0.1, center.lng + 0.1));
bounds.extend(new window.google.maps.LatLng(center.lat - 0.1, center.lng - 0.1));
map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (loadError) {
    return <div>There was an error loading the Google Maps API</div>;
  }

  return isLoaded && center!= {lat: 0, lng: 0}? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{disableDefaultUI: true}}
    >
        <Marker position={center} />
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}

export default React.memo(Map);
