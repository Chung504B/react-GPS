const mongoose = require("mongoose");

const GeoJsonSchema = new mongoose.Schema({
  type: { type: String, default: "Feature" },
  geometry: {
    type: { type: String, default: "point" },
    coordinates: {
      type: [Number],
      require: true, // Array of numbers [longitude, latitude]
    },
  },
  properties: {
    id: { type: String, required: true },
    road: { type: String, required: true },
    carSpeed: { type: Number, required: true },
    speedLimit: { type: Number, required: true },
    GPStime: { type: String, required: true },
    overSpeedLimit: { type: String },
  },
});

const GeoJson = mongoose.model("GeoJson", GeoJsonSchema);

module.exports = GeoJson;
