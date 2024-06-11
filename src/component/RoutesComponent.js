import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useMapsLibrary, useMap  } from '@vis.gl/react-google-maps';
import Route from '../utils/Route';
import { MoveMarkerAlongRoute } from './MoveMarkerAlongRoute';
import { RoutePoints } from '../assets';
import { getSidewalkAccessibility } from '../utils/getSidewalkAccessibility';
import { processWKBArray } from '../utils/readWKB';
import { WKB } from '../assets';
const start = { lat: 40.713536, lng: -74.011223 };
const end = { lat: 40.7284405, lng: -74.0 };
const minLat = -73.98969102652072;
const minLon = 40.75031259197294;
const maxLat = -73.97796819057606;
const maxLon = 40.759227106897974;

export const RoutesComponent = () => {
  // useMapsLibrary loads the geocoding library, it might initially return `null`
  // if the library hasn't been loaded. Once loaded, it will return the library
  // object as it would be returned by `await google.maps.importLibrary()`
  const [routes, setRoutes] = useState(null);
  
  const map = useMap();
  const routesLib = useMapsLibrary('routes');


  const getDirections = () => {
    if (!routesLib || !map) return;
    var rendererOptions = {
      map: map
    };
    const directionsService = new routesLib.DirectionsService();
    const directionsRequest = {
      destination: end,
      origin: start,
      travelMode: "WALKING",
      // provideRouteAlternatives: true,
    };

    directionsService.route(directionsRequest, (result, status) => {
      if (status === 'OK') {
        console.log(result);
        // console.log(pathCoordinates);

        const routeObjects = result.routes.map((route, index) => {
          const directionsRenderer = new routesLib.DirectionsRenderer(rendererOptions);
          directionsRenderer.setDirections(result);
          directionsRenderer.setRouteIndex(index);
          return new Route(route)
        });
        // setRoutes(routeObjects[0].route)
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };
  useEffect(() => {
    if (!routesLib || !map) return;
    // getDirections()
    // setRoutes(RoutePoints)
    console.log(processWKBArray(WKB))
    // getSidewalkAccessibility(minLat, minLon, maxLat, maxLon)

  }, [routesLib, map]);

  return <div>
    {routes && routes.length > 0 && <MoveMarkerAlongRoute route={routes} />}
  </div>;
};