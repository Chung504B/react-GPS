import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import "./app.css";
import authService from "./Map/auth.service";
import { Map } from "./Map/Map";
import { AllData } from "./data/alldata";
import { MyComponent } from "./data/test2";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import About from "./pages/About";
import Bar from "./pages/bar";
import Pie from "./pages/pie";
import PieData102 from "./pages/pie 102";
import Dashboard from "./pages/dashboard";

function App() {
  let [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<Map />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/overspeed" element={<MyComponent />} />
          <Route path="/alldata" element={<AllData />} />
          <Route path="/piedata" element={<Pie />} />
          <Route path="/No102piedata" element={<PieData102 />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
