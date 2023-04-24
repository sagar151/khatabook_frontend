import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "../pages/Layout/AuthLayout";
import Redirect from "../pages/Layout/Redirect/Redirect";
import Dashboard from "../pages/Dashboard/Dashboard";
import { AuthContext } from "../context";

const RoutesLayout = () => {
  const [isAuthenticated, setAuthenticated] = useState(
    () => localStorage.getItem("token") !== null
  );

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return (
    <AuthContext.Provider value={{ login: login, logout: logout }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<AuthLayout />}></Route>
          <Route path="/redirect" element={<Redirect />}></Route>
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <AuthLayout />}
          ></Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default RoutesLayout;
