import React, { useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export default function SidePanel() {
  const [inputValue, setInputValue] = useState("");
  const placesLibrary = useMapsLibrary("places");
  const [service, setService] = useState(null);
  const [results, setResults] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);


  useEffect(() => {
    if (placesLibrary) {
      setService(new placesLibrary.AutocompleteService());
    } else {
      setService(null);
    }
  }, [placesLibrary]);

  const updateResults = (inputValue) => {
    if (!service || inputValue.length === 0) {
      setResults([]);
      return;
    }
    const request = { input: inputValue };
    service.getQueryPredictions(request, (res) => {
      setResults(res || []);
    });
  };

  const onInputChange = (ev) => {
    const value = ev.target.value;
    setInputValue(value);
    updateResults(value);
  };

  const handleSelectedPlace = (place) => {
    setInputValue(place.description);
    setResults([]);
  };

  const handleMouseEnter = (index) => {
    console.log("mouse enter");
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    console.log("mouse leave");
    setHoveredIndex(null);
  };

  if (!service) return null;

  return (
    <div style={{ margin: "10px", position: "relative" }}>
      <h4>Search By Name</h4>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search address"
          value={inputValue}
          onChange={onInputChange}
          style={{
            width: "100%",
            padding: "10px",
            boxSizing: "border-box",
            marginBottom: "5px",
          }}
        />
        {results.length > 0 && (
          <div className="suggestions">
            {results.map((place, index) => (
              <div
                key={place.place_id}
                className={`suggestion-item ${hoveredIndex === index ? "hover" : ""}`}
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
    </div>
  );
}
