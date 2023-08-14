import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import { MarkerLayerWithTooltip } from "../layers/marker_layer_with_tooltip";
import { Marker, Tooltip, useMap, Popup } from "react-leaflet";
import { alertIcon } from "../icons/alertIcon";
import authService from "../Map/auth.service";

const API_URL = "http://localhost:8080";

export const MyComponent = ({ currentUser, setCurrentUser }) => {
  const [id, setId] = useState(null);
  const [road, setRoad] = useState("大學路");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [carSpeed, setCarSpeed] = useState(66);
  const [speedLimit, setSpeedLimit] = useState(66);
  const [overspeed, setOverSpeed] = useState("good driver");
  const [geoJson, setGeoJson] = useState();
  let [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  useEffect(() => {
    // localStorage.removeItem("user");
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      let response = await axios.get(API_URL + "/overspeed");
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
      setId(response.data.properties.id);
      setRoad(response.data.properties.road);
      setLat(response.data.geometry.coordinates[1]);
      setLong(response.data.geometry.coordinates[0]);
      setCarSpeed(response.data.properties.carSpeed);
      setSpeedLimit(response.data.properties.speedLimit);
      setOverSpeed(response.data.properties.overSpeedLimit);
      setGeoJson(response.data);
      // localStorage.setItem("position", responce.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // return (
  //   <div>
  //     {!id && <div>No OverSpeedData on Storage </div>}
  //     {id && (
  //       <div>
  //         The car {id} drive at {road} at location
  //         <div>
  //           [{lat},{long}]
  //         </div>
  //         <div>
  //           speed at {carSpeed} is over its speed limit {speedLimit}
  //         </div>
  //         <div>It is {overspeed}</div>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div>
      {!{ currentUser } && <h1> No OverSpeedData on Storage </h1>}
      {{ currentUser } && (
        <MapContainer
          center={currentUser.geometry.coordinates}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={currentUser.geometry.coordinates} icon={alertIcon}>
            <Tooltip>
              <h3>
                Car {currentUser.properties.id} drive on{" "}
                {currentUser.properties.road} at{" "}
                {currentUser.properties.GPStime}
              </h3>
              Car speed: <b>{currentUser.properties.carSpeed} km/h</b>
              <br />
              Speed limit: <b>{currentUser.properties.speedLimit} km/h</b>
              <br />
              Over Speed Limit : <b>{currentUser.properties.overSpeedLimit} </b>
              <br />
            </Tooltip>
          </Marker>
        </MapContainer>
      )}
      ;
    </div>
  );
};
// export const driveData = {
//   geometry: { coordinates: [121.060764, 24.79054], type: "point" },
//   properties: {
//     id: { id },
//     road: { road },
//     carSpeed: { carSpeed },
//     speedLimit: { speedLimit },
//     GPStime: "Sat, 27 May 2023 05:54:50 GMT",
//     overSpeedLimit: { overspeed },
//   },
//   type: "Feature",
// };
