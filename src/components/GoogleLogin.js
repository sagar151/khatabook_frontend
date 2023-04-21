import React from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleLogin = () => {
  const handleLoginWithGoogle = async () => {
    window.open("http://localhost:8080/api/1/khatabook/google", "_self");
  };
  return (
    <Button
      variant="outlined"
      className="google-btn"
      startIcon={<GoogleIcon style={{ color: "#1976d2" }} />}
      onClick={() => handleLoginWithGoogle()}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleLogin;
