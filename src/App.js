import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useRef, useEffect, useState } from "react";
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
    // load station data
    fetch("seattle-weather-stations.json")
      .then((res) => res.json())
      .then((data) => setLocationsList(data["results"]));
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
            //offsetTop={-10}
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
            <h2>{selectedLocation.name}</h2>
          </Popup>
        ) : (
          <></>
        )}
      </ReactMapGL>
    </div>
  );
}
