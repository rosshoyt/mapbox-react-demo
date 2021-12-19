import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useEffect, useState } from "react";
import "./index.css";

// default MapBox  public token
let accessToken =
  "pk.eyJ1Ijoicm9zc2hveXQiLCJhIjoiY2t4Y2Jzcmw0NDA1ZjJwcDk0cjFqMXJvYiJ9.d0Tc4UAhJ7HdV83xpqUm0w";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 47.608013,
    longitude: -122.335167,
    width: "100vw",
    height: "100vh",
    zoom: 9,
  });

  const [locationsList, setLocationsList] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // listen for escape (to exit the current map selection)
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedLocation(null);
      }
    };
    window.addEventListener("keydown", listener);
    // load station data
    fetch("seattle-weather-stations.json")
      .then((res) => res.json())
      .then((data) => setLocationsList(data["results"]));

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {locationsList.map((location) => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
            offsetTop={-20}
            offsetLeft={-15}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedLocation(location);
              }}
            >
              <img src="location-icon.png" alt="location icon" />
            </button>
          </Marker>
        ))}
        {selectedLocation ? (
          <Popup
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            onClose={() => {
              setSelectedLocation(null);
            }}
          >
            <h4>{selectedLocation.name}</h4>
            <div>
              Latitude/Longitude: ({selectedLocation.latitude},{" "}
              {selectedLocation.latitude}
            </div>
            <div>
              Elevation: {selectedLocation.elevation}{" "}
              {selectedLocation.elevationUnit}
            </div>
          </Popup>
        ) : (
          <></>
        )}
      </ReactMapGL>
    </div>
  );
}
