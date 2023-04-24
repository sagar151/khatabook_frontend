import React from "react";
import { Box } from "@mui/material";
import Logo from "../../assets/logo.png";
import { FiSettings } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";
import "./Header.css";

const Header = () => {
  return (
    <Box className="header-main">
      <Box className="header-logo">
        <img src={Logo} alt="logo" className="logo" />
        <GoThreeBars />
      </Box>
      <Box className="header-setting">
        <Box className="header-setting-icon">
          <FiSettings />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
