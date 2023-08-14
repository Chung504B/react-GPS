import React, { useEffect, useState } from "react";
import axios from "axios";
import authService from "../Map/auth.service";

const API_URL = "http://localhost:8080";

export const PieData = ({}) => {
  const [Data, setData] = useState([]);
  let [currentUser, setCurrentUser] = useState(authService.getCurrentData());
  useEffect(() => {
    localStorage.removeItem("data");
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      let response = await axios.get(API_URL + "/accPiedata");
      console.log(response);
      localStorage.setItem("data", JSON.stringify(response.data));

      setData(response.data);

      // localStorage.setItem("position", responce.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return data;
};
