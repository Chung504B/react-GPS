import L from "leaflet";
import iconUrl from "./../images/marker-icon.png";

const { iconSize, shadowSize, iconAnchor, popupAnchor, tooltipAnchor } =
  L.Marker.prototype.options.icon.options;

export const defaultIcon = L.icon({
  iconUrl,

  iconSize,
  shadowSize,
  iconAnchor,
  popupAnchor,
  tooltipAnchor,
});
