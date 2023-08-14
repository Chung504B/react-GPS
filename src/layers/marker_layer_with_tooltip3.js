import React from "react";
import { Marker, Tooltip, useMap } from "react-leaflet";
import { alertIcon } from "../icons/alertIcon";

export const MarkerLayerWithTooltip3 = ({ data }) => {
  const leafletMap = useMap();
  return data.map((feature) => {
    const { coordinates } = feature.geometry;
    const { id, road, carSpeed, speedLimit, overSpeedLimit, GPStime } =
      feature.properties;
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[0], coordinates[1]]}
        icon={alertIcon}
      >
        <Tooltip>
          <h3>
            Car {id} drive on {road} at {GPStime}
          </h3>
          Car speed: <b>{carSpeed} km/h</b>
          <br />
          Speed limit: <b>{speedLimit} km/h</b>
          <br />
          Over Speed Limit? : <b>{overSpeedLimit} </b>
          <br />
        </Tooltip>
      </Marker>
    );
  });
};
