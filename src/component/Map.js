// src/components/Map.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript,Polyline, APIProvider } from '@react-google-maps/api';
const API_KEY = "AIzaSyBhnZQKdO2Vs0DT3aLvj6Q4G_VIeBMbiuA"


export const Map = () => (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat: 22.54992, lng: 0}}
        defaultZoom={3}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
    </APIProvider>
  );