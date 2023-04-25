import React from "react";
import { Box } from "@mui/material";
import Logo from "../../assets/logo.png";
import { FiSettings } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "./Header.css";

const Header = ({ open, onOpen, onClose }) => {
  return (
    <Box className="header-main">
      <Box className="header-logo">
        <img src={Logo} alt="logo" className="logo" />
        {open ? <ChevronLeftIcon onClick={ onClose} /> : <GoThreeBars onClick={onOpen} />}
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
