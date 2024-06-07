import axios from 'axios';

const ORS_API_KEY = '5b3ce3597851110001cf62483ee2aef91d124c13b28de630fdce8ea7';
const ORS_API_URL = 'https://api.openrouteservice.org/v2/directions/';

// con
const getRoute = async (start, end) => {
  try {
    console.log(start, end)
    const response = await axios.get(`${ORS_API_URL}foot-walking`, {
      params: {
        api_key: ORS_API_KEY,
        
        start: `${start[1]},${start[0]}`,// 
        end: `${end[1]},${end[0]}`,
      },
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching route:', error);
    throw error;
  }
};

export { getRoute };
