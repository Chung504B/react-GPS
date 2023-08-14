import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import { MarkerLayerWithTooltip } from "../layers/marker_layer_with_tooltip";
import { MarkerLayerWithTooltip3 } from "../layers/marker_layer_with_tooltip3";
import { Marker, Tooltip, useMap, Popup } from "react-leaflet";
import { defaultIcon } from "../icons/defaultIcon";
import authService from "../Map/auth.service";
import { cars } from "../data/cars";

const API_URL = "http://172.20.10.2:8080";

export const MyComponent = ({}) => {
  const [geoJson, setGeoJson] = useState([]);
  let [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      let response = await axios.get(API_URL + "/overspeed");
      console.log(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify(response.data));
      setGeoJson(localStorage.getItem("user"));

      // localStorage.setItem("position", responce.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <MapContainer center={[23.6, 120.9]} zoom={8} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerLayerWithTooltip3 data={currentUser} />
      </MapContainer>
    </div>
  );
};
