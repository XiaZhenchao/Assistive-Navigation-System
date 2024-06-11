import axios from 'axios';

// Define the function that fetches the sidewalk accessibility data
export const getSidewalkAccessibility = async (minLat, minLon, maxLat, maxLon) => {
    try {
      // Construct the URL with query parameters
      const url = `http://34.46.145.148:5000/get-sidewalk-accessibility?min_lat=${minLat}&min_lon=${minLon}&max_lat=${maxLat}&max_lon=${maxLon}`;
      
      // Make the GET request
      const response = await axios.get(url);
      
      // Log the response data
      console.log(response.data);
      
      // Return the response data (optional)
      return response.data;
    } catch (error) {
      console.error('Error fetching sidewalk accessibility data:', error);
      throw error;
    }
  };