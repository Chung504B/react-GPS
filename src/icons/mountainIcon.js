import L from "leaflet";

import locationPng from "../images/location.png";

const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [30, 35],
    iconAnchor: [10, 10],
    tooltipAnchor: [0, 0],
  },
});

export const mountainIcon = new LeafIcon({ iconUrl: locationPng });
