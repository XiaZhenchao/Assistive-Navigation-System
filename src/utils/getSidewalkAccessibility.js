import axios from 'axios';

// Define the function that fetches the sidewalk accessibility data
export const getSidewalkAccessibility = async (minLat, minLon, maxLat, maxLon) => {
    try {
      // Construct the URL with query parameters
      
      const response = await axios.get('http://localhost:5000/api/data');
      // Return the response data (optional)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching sidewalk accessibility data:', error);
      throw error;
    }
  };