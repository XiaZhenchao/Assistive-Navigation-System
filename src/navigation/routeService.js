// routeService.js
import axios from 'axios';
import { useMapsLibrary, } from '@vis.gl/react-google-maps';

const DIRECTIONS_API_URL = 'https://maps.googleapis.com/maps/api/directions/json';
// string directionsApiUrl = $"https://maps.googleapis.com/maps/api/directions/json?origin={startPoint}&destination={lat},{lng}&mode=transit&transit_mode={transitModes}&key={apiKey}";
/**
 * Calculate the route between two points using Axios.
 * @param {object} start - The start point coordinates.
 * @param {object} end - The end point coordinates.
 * @param {string} apiKey - Your Google Maps API key.
 * @returns {object} - The calculated route.
 */
export const calculateRoute = async (start, end, apiKey) => {
  try {
    // const directionsRenderer = new google.maps.DirectionsRenderer();
    // const directionsService = new google.maps.DirectionsService();
    // const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&key=${apiKey}`);
    // const data = await response.json();
    
      
      return 
    //   return response.data.routes[0]; // Return the first route
  } catch (error) {
    // console.error('Error calculating route:', error);
    throw error;
  }
};

/**
 * Optimize the route with multiple waypoints.
 * @param {array} waypoints - Array of waypoint coordinates.
 * @returns {object} - The optimized route.
 */
export const optimizeRoute = async (waypoints) => {
  try {
    // Implement route optimization logic here
  } catch (error) {
    console.error('Error optimizing route:', error);
    throw error;
  }
};
