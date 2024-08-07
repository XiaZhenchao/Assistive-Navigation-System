import React, { useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import useStore from "../store";
import { PositionMarker } from "./PositionMarker";
import { NavigationStatus } from "../store/useNavigationSlice";
export default function UserInputOutput() {
  const {
    setDestination,
    setNavigationServiceStatus,
    navigationServiceStatus,
  } = useStore.getState();
  const [inputValue, setInputValue] = useState("");
  const placesLibrary = useMapsLibrary("places");
  const [service, setService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [predictions, setPredictions] = useState<
    Array<google.maps.places.QueryAutocompletePrediction> | []
  >([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  useEffect(() => {
    if (placesLibrary) {
      setService(new placesLibrary.AutocompleteService());
    }
  }, [placesLibrary, navigationServiceStatus]);

  const updatePredictions = (inputValue: string) => {
    if (!service || inputValue.length === 0) {
      setPredictions([]);
      return;
    }
    const newYorkBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(40.477399, -74.25909), // Southwest corner of NYC
      new google.maps.LatLng(40.917577, -73.700272) // Northeast corner of NYC
    );
    // const request = { input: inputValue };
    const request = {
      input: inputValue,
      bounds: newYorkBounds,
    };
    service.getQueryPredictions(request, (res) => {
      setPredictions(res || []);
    });
  };

  const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setInputValue(value);
    updatePredictions(value);
  };

  const handleSelectedPlace = (
    place: google.maps.places.QueryAutocompletePrediction
  ) => {
    setInputValue(place.description);
    setDestination(place.description);
    setNavigationServiceStatus(NavigationStatus.InProgress);
    setPredictions([]);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  if (!service) return null;

  return (
    <div className="searchBar" style={{ margin: "10px", position: "relative" }}>
      <h4>Search By Name</h4>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search destination"
          value={inputValue}
          onChange={onInputChange}
          style={{
            width: "100%",
            padding: "10px",
            boxSizing: "border-box",
            marginBottom: "5px",
          }}
        />
        {predictions.length > 0 && (
          <div className="suggestions">
            {predictions.map((place, index) => (
              <div
                key={place.place_id}
                className={`suggestion-item ${
                  hoveredIndex === index ? "hover" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleSelectedPlace(place)}
              >
                {place.description}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => console.log("Search for " + inputValue)}
          style={{
            width: "100%",
            padding: "10px 15px",
            fontSize: "1rem",
          }}
        >
          Search
        </button>
      </div>
      <div>
        <PositionMarker></PositionMarker>
        {/* {navigationServiceStatus == NavigationStatus.InProgress && <PositionMarker></PositionMarker>} */}
      </div>
    </div>
  );
}
