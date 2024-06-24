import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useMapsLibrary, useMap, GoogleMapsContext } from '@vis.gl/react-google-maps';
import Route from '../utils/Route';
import { RoutePoints } from '../assets';
import { getSidewalkAccessibility } from '../api/getSidewalkAccessibility';
import { processWKBArray,readWKB } from '../utils/readWKB';
// import MultiPolygonArrays from '../assets/MultiPolygonArrays.json'
// import localGeojson from '../assets/testGeojson.json'
import localGeojson from '../assets/manhhattan.json'
const FileSaver = require('file-saver');

const start = { lat: 40.713536, lng: -74.011223 };
const end = { lat: 40.7284405, lng: -74.0 };
const center = { lat: 40.7284405, lng: -74.0 };

const outerCoords = [
  { lat: center.lat + 0.002, lng: center.lng - 0.005 }, // north west
  { lat: center.lat - 0.003, lng: center.lng - 0.005 }, // south west
  { lat: center.lat - 0.003, lng: center.lng + 0.005 }, // south east
  { lat: center.lat + 0.002, lng: center.lng + 0.005 }, // north east
];
const innerCoords1 = [
  { lat: center.lat + 0.001, lng: center.lng - 0.003 },
  { lat: center.lat - 0.002, lng: center.lng - 0.003 },
  { lat: center.lat - 0.002, lng: center.lng - 0.002 },
  { lat: center.lat + 0.001, lng: center.lng - 0.002 },
];

// Define the LatLng coordinates for another inner path.
const innerCoords2 = [
  { lat: center.lat + 0.001, lng: center.lng + 0.002 },
  { lat: center.lat - 0.002, lng: center.lng + 0.002 },
  { lat: center.lat - 0.002, lng: center.lng + 0.003 },
  { lat: center.lat + 0.001, lng: center.lng + 0.003 },
];
export const RoutesComponent = () => {
  // useMapsLibrary loads the geocoding library, it might initially return `null`
  // if the library hasn't been loaded. Once loaded, it will return the library
  // object as it would be returned by `await google.maps.importLibrary()`
  const [routes, setRoutes] = useState(null);
  const routesLib = useMapsLibrary('routes');
  
  const map = useMap();
  const mapsLib = useMapsLibrary('maps')
  function createMultiPolygonOnMap(coordinates) {
    coordinates.forEach(polygonCoords => {
      polygonCoords.forEach(polygon => {
        const polygonPaths = polygon.map(ring => ({
          lat: ring[1],
          lng: ring[0]
        }));
  
        // Create the polygon
        const newPolygon = new mapsLib.Polygon({
          paths: polygonPaths,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
  
        // Add polygon to map
        newPolygon.setMap(map); // Assuming `map` is your Google Map instance
      });
    });
  }
  const plot = (MultiPolygonArrays) => {
    MultiPolygonArrays.forEach(MultiPolygon => createMultiPolygonOnMap(MultiPolygon.coordinates))
  }

  
  useEffect(() => {
    const fetchData = async () => {
      
      if (!routesLib || !map) return;
      if (!routes){
        getDirections()
        return 
      }

     

      // setRoutes(RoutePoints)
      // plot()
      try {
        const wkb = await getSidewalkAccessibility(routes);
        const MultiPolygonArrays = processWKBArray(wkb)
        plot(MultiPolygonArrays)
      } catch (error) {
        console.error('Error fetching sidewalk accessibility data:', error);
        // Handle error state or show error message
      }
    };

    fetchData();
  }, [routesLib, map, routes]);
  const getDirections = () => {
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
        const routeObjects = result.routes.map((route, index) => {
          const directionsRenderer = new routesLib.DirectionsRenderer(rendererOptions);
          directionsRenderer.setDirections(result);
          directionsRenderer.setRouteIndex(index);
          return new Route(route)
        });
        
        setRoutes(routeObjects[0].pathCoordinates)
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };
  return <div>


  </div>;
};