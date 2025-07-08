import React from "react";
import "./tomatoApp.css";
import TomatoNavbar from "./TomatoNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TomatoLandingpage from "./TomatoLandingpage";
import TomatoFooter from "./TomatoFooter";
import TomatoMenuPage from "./TomatoMenuPage";
const TomatoApp = () => {
  return (
    <Router>
      <TomatoNavbar />
      <Routes>
        <Route path="/" element={<TomatoLandingpage />} />
        <Route path="/menupage" element={<TomatoMenuPage />} />
      </Routes>
      <TomatoFooter />
    </Router>
  );
};

export default TomatoApp;
