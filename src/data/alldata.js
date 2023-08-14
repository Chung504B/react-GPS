import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import { MarkerLayerWithTooltip2 } from "../layers/marker_layer_with_tooltip2";
import authService from "../Map/auth.service";

const API_URL = "http://172.20.10.2:8080";

export const AllData = ({}) => {
  const [geoJson, setGeoJson] = useState([]);
  let [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  useEffect(() => {
    localStorage.removeItem("user");
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      let response = await axios.get(API_URL + "/alldata");
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));

      setGeoJson(response.data);

      // localStorage.setItem("position", responce.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {!{ currentUser } && <h1> No OverSpeedData on Storage </h1>}
      {{ currentUser } && (
        <MapContainer center={[23.6, 120.9]} zoom={8} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerLayerWithTooltip2 data={currentUser} />
        </MapContainer>
      )}
      ;
    </div>
  );
};
