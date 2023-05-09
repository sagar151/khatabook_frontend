import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "../pages/Layout/AuthLayout";
import Redirect from "../pages/Layout/Redirect/Redirect";
import MainLayout from "../pages/MainLayout/MainLayout";
import { AuthContext } from "../context";
import Profile from "../pages/Profile/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import Creditor from "../pages/Creditor/Creditor";
import Debtor from "../pages/Debtor/Debtor";

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
            path=""
            element={isAuthenticated ? <MainLayout /> : <AuthLayout />}
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="creditor" element={<Creditor />} />
            <Route path="debtor" element={<Debtor />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default RoutesLayout;
