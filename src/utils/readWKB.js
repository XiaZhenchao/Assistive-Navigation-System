import { Buffer } from 'buffer';
window.Buffer = window.Buffer || require("buffer").Buffer;


var wkx = require('wkx');
// var Buffer = require('buffer').Buffer;


export const readWKB = (wkbstring) => {
  // window.Buffer = Buffer;
  var wkbBuffer = window.Buffer.from(wkbstring, 'hex');
  var geometry = wkx.Geometry.parse(wkbBuffer);
  return geometry.toGeoJSON();
};
export const processWKBArray = (wkbArray) => {
  return wkbArray.points.map(point => {
    const geoJSON = readWKB(point[0]);
    
    let coordinates = {};
    if (geoJSON.type === 'MultiPolygon') {
      // If the geometry is a polygon, convert the coordinates to an array of arrays
      
      coordinates = geoJSON.coordinates[0].map(coord => coord.map(point => ({ lat: point[1], lng: point[0] })));


    } else {

      // For other types of geometries (e.g., Point, LineString), extract the first coordinate
      coordinates = { lat: geoJSON.coordinates[1], lng: geoJSON.coordinates[0] };
    }
    return {
      type: 'Feature',
      geometry: {
        type: geoJSON.type,
        coordinates: coordinates
      },
      properties: {
        type: point[2]
        // Add more properties as needed
      }
    };
  });
};

