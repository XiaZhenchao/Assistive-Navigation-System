import React, { useEffect, useRef, useMemo } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
const start = { lat: 40.713536, lng: -74.011223 };
const end = { lat: 40.7484405, lng: -73.985664 };


export const RoutesComponent = () => {
    // useMapsLibrary loads the geocoding library, it might initially return `null`
    // if the library hasn't been loaded. Once loaded, it will return the library
    // object as it would be returned by `await google.maps.importLibrary()`
    const map = useMap();
    const routesLib = useMapsLibrary('routes');
    const extractPathCoordinates = (routes) => {
        return routes.map(route =>
            route.legs.flatMap(leg =>
                leg.steps.flatMap(step =>
                    step.path.map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))
                )
            )
        );
    };
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
          provideRouteAlternatives: true,
        };
      
        directionsService.route(directionsRequest, (result, status) => {
          if (status === 'OK') {
            console.log(result);
            const pathCoordinates = extractPathCoordinates(result.routes);
            console.log(pathCoordinates);
            result.routes.forEach((route, index) => {
              const directionsRenderer = new routesLib.DirectionsRenderer(rendererOptions);
              directionsRenderer.setDirections(result);
              directionsRenderer.setRouteIndex(index);
            });
          } else {
            console.error('Directions request failed due to ' + status);
          }
        });
      };
    useEffect(() => {
        if (!routesLib || !map) return;
        // getDirections()
    }, [routesLib, map]);

    return <></>;
};