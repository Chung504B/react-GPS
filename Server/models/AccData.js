const mongoose = require("mongoose");

const AccDataSchema = new mongoose.Schema({
  id: { type: String, required: true },
  acc: { type: Number, required: true },
  time: { type: String, required: true },
  hardBrake: { type: String },
});

const AccData = mongoose.model("AccData", AccDataSchema);

module.exports = AccData;
