import axios from "axios";
const API_URL = "http://localhost:8080";

class AuthService {
  overspeed() {
    return axios.get(API_URL + "/overspeed", {});
  }
  alldata() {
    // remove localStorage.setItem("user", JSON.stringify(response.data));
    return axios.get(API_URL + "/alldata", {});
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  getCurrentData() {
    return localStorage.getItem("data");
  }
  getCurrentData2() {
    return localStorage.getItem("data2");
  }
}

export default new AuthService();
