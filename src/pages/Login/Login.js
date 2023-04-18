import * as React from "react";
import Box from "@mui/material/Box";
import "./Login.css";
import { Button, Typography } from "@mui/material";

const Login = () => {
  return (
    <Box className="main">
      <Box className="title">
        <Typography sx={{fontWeight:"bold" ,mb:3}} variant="h3">
          Hello Guest
        </Typography>
        <Typography variant="subtitle1">
          Welcome to Mate Family.Please Login with your personal account information latter.
        </Typography>
      </Box>
      <Button>Login</Button>
    </Box>
  );
};

export default Login;
