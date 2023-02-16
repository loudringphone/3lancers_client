// import React from 'react';
// import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '400px',
//   height: '400px'
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };



// function Map() {
//   const { isLoaded, loadError } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: 'AIzaSyDDeilR0uC4lPekryob1G9q64tCLu8118A',
//   });

//   const [map, setMap] = React.useState(null);

//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds();
// bounds.extend(new window.google.maps.LatLng(center.lat + 0.1, center.lng + 0.1));
// bounds.extend(new window.google.maps.LatLng(center.lat - 0.1, center.lng - 0.1));
// map.fitBounds(bounds);

//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   if (loadError) {
//     return <div>There was an error loading the Google Maps API</div>;
//   }

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={5}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//         <Marker position={center} />
//       { /* Child components, such as markers, info windows, etc. */ }
//       <></>
//     </GoogleMap>
//   ) : (
//     <div>Loading...</div>
//   );
// }

// export default React.memo(Map);
