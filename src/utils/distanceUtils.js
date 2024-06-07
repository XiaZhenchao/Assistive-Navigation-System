import * as turf from '@turf/turf';

export const calculateDistance = (point1, point2, units = 'miles') => {
  const from = turf.point(point1);
  const to = turf.point(point2);
  return turf.distance(from, to, { units });
};

export const calculateTotalDistance = (coordinates) => {
    let totalDistance = 0;
  
    for (let i = 0; i < coordinates.length - 1; i++) {
      
      totalDistance += calculateDistance(coordinates[i], coordinates[i + 1]);
    }
  
    return totalDistance;
  };

  export const createRandomObstacles = (coordinates) =>{
    
  }