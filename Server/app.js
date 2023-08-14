const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const cors = require("cors");
const https = require("https");
const path = require("path");
const bingMapsApiKey =
  "AgzK_VeNfr4a9jI_0TA2WUVWrJAofFJgLh53odqzKPr - bo10dEYnuQpClnzKZBby";
//const GPSdata = require("./models/GPSData");
const GeoJson = require("./models/GeoJson");
const AccData = require("./models/ACCdata");

//mongodb local storage connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/tryDB")
//   .then(() => {
//     console.log("連結到mongodb...");
//   })
//   .catch((e) => {
//     console.log(e);
//   });
// mongodb Atlas could staorage connection
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongodb atlas.");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", function (req, res) {
  res.send("Welcome to GPS Server");
});

app.get("/GPSdata", (req, res) => {
  //localhost:3000/GPSdata?value1=25.0221011&value2=121.3098999&value3=60.23
  let data = req.query;
  let id = data.value1;
  let lat = Number(data.value2); //25.0221011
  let long = Number(data.value3); //121.3098999
  let carSpeed = data.value4; //60.23
  let url = `https://dev.virtualearth.net/REST/v1/Routes/SnapToRoad?points=${lat},${long}&/includeTruckSpeedLimit=true&IncludeSpeedLimit=true&speedUnit=KPH&travelMode=driving&key=${bingMapsApiKey}`;
  // get request made by node .js
  https.get(url, (response) => {
    console.log("statusCode:", response.statusCode);
    let GPStime = new Date()
      .toString()
      .replace("(台北標準時間)", "")
      .replace("GMT+0800", "")
      .split(" ")
      .slice(1)
      .join(" ");
    response
      .on("data", (d) => {
        let djs = JSON.parse(d);
        console.log(djs);
        let speedLimit =
          djs.resourceSets[0].resources[0].snappedPoints[0].speedLimit;
        let roadName = djs.resourceSets[0].resources[0].snappedPoints[0].name;
        let roadarray = roadName.split("/");
        fetchData(roadarray)
          .then((value) => {
            console.log(value);
            if (value != false) {
              console.log(value);
              let road = value;
              console.log(
                "car" +
                  id +
                  " is locate at " +
                  road +
                  "widh speed limit is " +
                  speedLimit +
                  "KM/hr. at" +
                  GPStime
              );
              let overSpeedLimit = overSpeed(carSpeed, speedLimit);
              let location = [lat, long];
              console.log(location);
              let newGeoJson = new GeoJson({
                geometry: { coordinates: location },
                properties: {
                  id: id,
                  road: road,
                  carSpeed: carSpeed,
                  speedLimit: speedLimit,
                  GPStime: GPStime,
                  overSpeedLimit: overSpeedLimit,
                },
              });
              newGeoJson
                .save()
                .then(() => {
                  console.log("GPS data saved successfully");
                })
                .catch((err) => {
                  console.log(err);
                });
              res.send("data saved successfully");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .on("error", (e) => {
        console.error(e);
      });
  });
});
//receive the accelerration data from MPU6050 sensor
app.get("/Accdata", (req, res) => {
  //localhost:3000/GPSdata?value1=25.0221011&value2=121.3098999&value3=60.23
  let data = req.query;
  let id = data.value1;
  let acc = Number(data.value2); //25.0221011
  let time = new Date()
    .toString()
    .replace("(台北標準時間)", "")
    .replace("GMT+0800", "")
    .split(" ")
    .slice(1)
    .join(" ");
  let newAccData = new AccData({
    id: id,
    acc: acc,
    time: time,
  });
  newAccData
    .save()
    .then(() => {
      console.log("ACC data saved successfully");
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("data saved successfully");
});
//Give the overspeed data once receive the request
app.get("/overspeed", async (req, res) => {
  try {
    let data = await GeoJson.find(
      { "properties.overSpeedLimit": "Serious_Violation" }
      // "properties.overSpeedLimit": "Serious_Violation",
    ).exec();
    // res.send(StringifyID(data));
    res.send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/alldata", async (req, res) => {
  try {
    let data = await GeoJson.find(
      {},
      { _id: 0 }
      // "properties.overSpeedLimit": "Serious_Violation",
    ).exec();
    // res.send(StringifyID(data));
    res.send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(8080, () => {
  console.log("後端伺服器聆聽在port 8080...");
});

async function fetchData(array) {
  try {
    const result = await isArrayOfChineseCharacters(array);
    return result;
  } catch (error) {
    throw new Error("Failed to fetch data: " + error.message);
  }
}

async function isArrayOfChineseCharacters(array) {
  for (let i = 0; i < array.length; i++) {
    if (containsChineseCharacter(array[i])) {
      return array[i];
    }
  }
  return false;
}

function isChineseCharacter(char) {
  // Regular expression to match Chinese characters
  const regex =
    /^[\u4E00-\u9FFF\u3400-\u4DBF\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}\u{2F800}-\u{2FA1F}]+$/u;
  return regex.test(char);
}
function containsChineseCharacter(str) {
  // Regular expression to match Chinese characters
  const regex =
    /[\u4E00-\u9FFF\u3400-\u4DBF\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}\u{2F800}-\u{2FA1F}]/u;
  return regex.test(str);
}

function overSpeed(Carspeed, speedLimit) {
  if (Carspeed <= speedLimit + 10) return "Good driver";
  else if (Carspeed - speedLimit > 20) return "Serious_Violation";
  else return "Violation";
}

// function that delete mongoose _id
function StringifyID(documents) {
  documents.forEach(function (document) {
    // Remove the _id field
    document._id = document._id.toString();
    // Do something with the modified document
  });
  return documents;
}
