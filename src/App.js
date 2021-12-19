import ReactMapGL, { Marker } from "react-map-gl";
import React, { useRef, useEffect, useState } from "react";

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
          <Marker key={location.id} latitude={location.latitude} longitude={location.longitude}>
            <button><img src="location-icon.png" alt="location icon"  width="10" height="10"/></button>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}
