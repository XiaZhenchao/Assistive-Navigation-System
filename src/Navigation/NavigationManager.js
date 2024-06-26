import { useMapsLibrary, useMap, GoogleMapsContext } from '@vis.gl/react-google-maps';
import Route from '../utils/Route';
import { plot } from './plot';
import { getSidewalkAccessibility } from '../api/getSidewalkAccessibility';
import { processWKBArray } from '../utils/readWKB';
export class NavigationManager{
    constructor (map, mapsLib, routesLib ){
        this.map = map;
        this.mapsLib = mapsLib;
        this.routesLib = routesLib;
    }
    async  navigationService()  {
        if (!this.routes) {
          this.getDirections()
          return
        }
        const wkb = await getSidewalkAccessibility(this.routes);
        const MultiPolygonArrays = processWKBArray(wkb)
        plot(MultiPolygonArrays)
      }
   getDirections = (start, end) => {
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
            this.routes = routeObjects[0].pathCoordinates
            // setRoutes()
          } else {
            console.error('Directions request failed due to ' + status);
          }
        });
      };
}