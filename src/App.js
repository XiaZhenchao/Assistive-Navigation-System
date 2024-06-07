import React, { useEffect, useRef, useMemo } from 'react';

import { APIProvider, Map, AdvancedMarker, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { RoutesComponent } from './component/RoutesComponent';
const start = { lat: 40.713536, lng: -74.011223 };
const end = { lat: 40.7484405, lng: -73.985664 };


function App() {

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log(API_KEY)
  // calculateRoute(start, end, API_KEY)

  const MAP_ID = "ID";


  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: '90vw', height: '90vh' }}
        defaultCenter={start}
        defaultZoom={13}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={MAP_ID}
      />
      <RoutesComponent />
      {/* <AdvancedMarker position={start} />
      <AdvancedMarker position={end} /> */}
    </APIProvider>
  );
}

export default App;