import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "../pages/Layout/AuthLayout";
import Redirect from "../pages/Redirect/Redirect";
import Dashboard from "../pages/Dashboard/Dashboard";

const RoutesLayout = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AuthLayout />}></Route>
        <Route exact path="/redirect" element={<Redirect />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
};

export default RoutesLayout;
