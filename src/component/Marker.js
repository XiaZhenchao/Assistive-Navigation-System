import React, { useEffect, useState } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';

export const Marker = ({ landmarker: MultiPolygonArrays }) => {
  
  let total_length = 0
  console.log(MultiPolygonArrays )
  for (let MultiPolygonArray of MultiPolygonArrays) {
    for (let coordinates of MultiPolygonArray.coordinates) {
      total_length += coordinates[0].length
      total_length += coordinates[1].length
    }
  }
  console.log(total_length)

  return (
    <>
      {/* {MultiPolygonArrays.map((LngLat, index) => (
        LngLat.coordinates.map((coords, idx) => (
          coords.map((LngLatArray, i) => (
            LngLatArray.map((lnglat, i) => (
              <AdvancedMarker key={i} position={lnglat} />
            ))
            // <AdvancedMarker key={`${index}-${idx}`} position={LngLat} />

          ))
        ))
      ))} */}
    </>
  );

};



// Usage

