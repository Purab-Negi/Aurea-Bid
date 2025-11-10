import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import SideDrawer from "./layout/SideDrawer";
import Signup from "./pages/Signup";
const App = () => {
  return (
    <Router>
      <SideDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
};

export default App;
