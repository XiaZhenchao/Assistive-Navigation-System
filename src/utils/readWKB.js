import { Buffer } from 'buffer';
window.Buffer = window.Buffer || require("buffer").Buffer;
var wkx = require('wkx');
// var Buffer = require('buffer').Buffer;

/**
 * @typedef {Object} MultiPolygon
 * @property {"MultiPolygon"} type - Type of the object, always "MultiPolygon".
 * @property {Array<Array<[number, number]>>} coordinates - Array of two arrays of [lng, lat] pairs.
 */

/**
 * @type {Array<MultiPolygon>}
 */



export const readWKB = (wkbstring) => {
  // window.Buffer = Buffer;
  var wkbBuffer = window.Buffer.from(wkbstring, 'hex');
  var geometry = wkx.Geometry.parse(wkbBuffer);
 
  return geometry.toGeoJSON();
};
export const processWKBArray = (wkbArray) => {
  return wkbArray.map(point => {
    const multiPolygonArray = readWKB(point[0]);
    return multiPolygonArray 
    // let coordinates = {};
    // if (multiPolygonArrays.type === 'MultiPolygon') {
    //   // If the geometry is a polygon, convert the coordinates to an array of arrays
      
    //   coordinates = multiPolygonArrays.coordinates[0].map(coord => coord.map(point => ({ lat: point[1], lng: point[0] })));


    // } else {

    //   // For other types of geometries (e.g., Point, LineString), extract the first coordinate
    //   coordinates = { lat: multiPolygonArrays.coordinates[1], lng: multiPolygonArrays.coordinates[0] };
    // }
    // return {
    //   type: 'Feature',
    //   geometry: {
    //     type: multiPolygonArrays.type,
    //     coordinates: coordinates
    //   },
    //   properties: {
    //     type: point[2]
    //     // Add more properties as needed
    //   }
    // };
  });
};

