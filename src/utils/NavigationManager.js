
import { useMapsLibrary, useMap, GoogleMapsContext } from '@vis.gl/react-google-maps';
// @ts-check
import { getSidewalkAccessibility } from '../api/getSidewalkAccessibility';
import Route from './Route';
import { processWKBArray } from './readWKB';
/**
 * @typedef {import('google.maps').Map} Map
 * @typedef {any} MapsLibrary
 */

/**
 * NavigationService class to handle map-related operations
 */
class NavigationManager{
      /**
   * @param {Map} map - Google Maps instance
   * @param {MapsLibrary} mapsLib - Google Maps library instance
   */
    constructor(map, mapsLib, routesLib){
        this.map = map;
        this.mapsLib = mapsLib;
        this.routesLib = routesLib;
    }
    async navigationService() {
        if (!this.routes) {
          this.getDirections()
          return
        }
        const wkb = await getSidewalkAccessibility(this.routes);
        const MultiPolygonArrays = processWKBArray(wkb)
        this.plot(MultiPolygonArrays)
    }
    async getDirections (end,start) {
        var rendererOptions = {
          map: this.map
        };
        const directionsService = new this.routesLib.DirectionsService();
        const directionsRequest = {
          destination: end,
          origin: start,
          travelMode: "WALKING",
          provideRouteAlternatives: true,
        };
    
        directionsService.route(directionsRequest, (result, status) => {
          if (status === 'OK') {
            const routeObjects = result.routes.map((route, index) => {
              const directionsRenderer = new this.routesLib.DirectionsRenderer(rendererOptions);
              directionsRenderer.setDirections(result);
              directionsRenderer.setRouteIndex(index);
              return new Route(route)
            });
            this.routes = routeObjects[0].pathcoordinates;
            return routeObjects
          } else {
            console.error('Directions request failed due to ' + status);
          }
        });
      };
      plot (MultiPolygonArrays){
        MultiPolygonArrays.forEach(MultiPolygon => this.createMultiPolygonOnMap(MultiPolygon.coordinates))
      }
     createMultiPolygonOnMap(coordinates) {
        coordinates.forEach(polygonCoords => {
          polygonCoords.forEach(polygon => {
            const polygonPaths = polygon.map(ring => ({
              lat: ring[1],
              lng: ring[0]
            }));
    
            // Create the polygon
            const newPolygon = new this.mapsLib.Polygon({
              paths: polygonPaths,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35
            });
    
            // Add polygon to map
            newPolygon.setMap(this.map); // Assuming `map` is your Google Map instance
          });
        });
      }
}