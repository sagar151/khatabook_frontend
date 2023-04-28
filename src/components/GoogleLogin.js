import React from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleLogin = ({text}) => {
  const handleLoginWithGoogle = async () => {
    window.open(process.env.REACT_APP_GOOGLE_LOGIN_URL, "_self");
  };
  return (
    <Button
      variant="outlined"
      className="google-btn"
      startIcon={<GoogleIcon style={{ color: "#1976d2" }} />}
      onClick={() => handleLoginWithGoogle()}
    >
      {text}
    </Button>
  );
};

export default GoogleLogin;
