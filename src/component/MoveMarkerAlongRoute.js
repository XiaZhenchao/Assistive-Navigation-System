import React, { useEffect, useState } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

export const MoveMarkerAlongRoute = ({ route }) => {
    const [currentPosition, setCurrentPosition] = useState(route[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      const timer = setInterval(() => {
        if (currentIndex < route.length) {
          setCurrentPosition(route[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        } else {
          clearInterval(timer);
        }
      }, 300); // Adjust the interval as needed
      
      return () => clearInterval(timer);
    }, [route, currentIndex]);
  
    return <AdvancedMarker position={currentPosition} />;

};

// Usage

