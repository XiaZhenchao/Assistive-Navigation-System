import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useMapsLibrary, useMap, GoogleMapsContext } from '@vis.gl/react-google-maps';
import Route from '../utils/Route';
import { RoutePoints } from '../assets';
import { getSidewalkAccessibility } from '../api/getSidewalkAccessibility';
import { processWKBArray, readWKB } from '../utils/readWKB';
import useStore from '../store';
import { NavigationManager } from '../Navigation/NavigationManager';
const start = { lat: 40.713536, lng: -74.011223 };
const end = { lat: 40.7284405, lng: -74.0 };
const center = { lat: 40.7284405, lng: -74.0 };

export const RoutesComponent = () => {
  // useMapsLibrary loads the geocoding library, it might initially return `null`
  // if the library hasn't been loaded. Once loaded, it will return the library
  // object as it would be returned by `await google.maps.importLibrary()`
  const [routes, setRoutes] = useState(null);
  const [navigationManager, setNavigationManage] = useState(null)
  const routesLib = useMapsLibrary('routes');
  const map = useMap();
  const mapsLib = useMapsLibrary('maps');

  const destination = useStore((state) => state.destination);
  // const setUserInput = useStore((state) => state.setUserInput);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
        },
        (error) => {
          console.error('Error Code:', error.code);
          console.error('Error Message:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Call the function


  useEffect(() => {
    const fetchData = async () => {

      if (!routesLib || !map || !mapsLib) return;
      if (!navigationManager) {
        setNavigationManage(new NavigationManager(map, mapsLib, routesLib));
        return
      }
      if (destination) {
        navigationManager.getDirections(start, destination)
      }
      else {
        navigationManager.getDirections(start, end)
      }
      // getLocation();
      try {
        // navigationService();

      } catch (error) {
        console.error('Error fetching sidewalk accessibility data:', error);
        // Handle error state or show error message
      }
    };

    fetchData();
  }, [routesLib, map, routes, destination, navigationManager, mapsLib]);

  return <div>


  </div>;
};