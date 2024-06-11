// src/utils/Route.js
class Route {
    constructor(route) {
      this.route = route;
      this.turnCount = this.calculateTurns();
      this.pathCoordinates = this.extractPathCoordinates();
    }
  
    // Method to count turns in the route
    calculateTurns() {
      let turnCount = 0;
      this.route.legs.forEach(leg => {
        leg.steps.forEach(step => {
          if (step.maneuver && step.maneuver.includes('turn')) {
            turnCount += 1;
          }
        });
      });
      return turnCount;
    }
  
    // Method to extract path coordinates from the route
    extractPathCoordinates() {
      return this.route.legs.flatMap(leg =>
        leg.steps.flatMap(step =>
          step.path.map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))
        )
      );
    }
  }
  
  export default Route;
  