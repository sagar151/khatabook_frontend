import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import "./Login.css";
import GoogleLogin from "../../components/GoogleLogin";

const Login = () => {
  return (
    <Box className="main">
      <Box className="title">
        <Typography
          sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
          variant="h3"
        >
          Hello Guest
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", color: "rgb(148, 144, 144)" }}
        >
          Welcome to Mate Family.Please Login with your personal account
          information letter.
        </Typography>
      </Box>
      <Box className="btn-container">
        <GoogleLogin text="Sign in with Google"/>
        <Box className="box-main">
          <Typography className="box-content">OR</Typography>
        </Box>
      </Box>
      <Box className="login-form">
        <TextField
          className="input"
          required
          id="outlined-required"
          label="Email Address"
        />
        <TextField
          className="input"
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Box
          sx={{ display: "flex", alignItems: "center", width: "340px", mb: 5 }}
        >
          <Checkbox
            defaultChecked
            size="small"
            sx={{ color: "rgb(148, 144, 144)" }}
          />
          <Typography sx={{ color: "rgb(148, 144, 144)" }}>
            Remember me.
          </Typography>
        </Box>
        <Box className="action-btn">
          <Button variant="contained">Sign in</Button>
          <Button variant="text">Forgot Password</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
