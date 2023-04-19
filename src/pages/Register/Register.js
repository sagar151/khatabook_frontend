import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import GoogleIcon from "@mui/icons-material/Google";
import './Register.css'

const Register = () => {
  return (
    <Box className="main">
      <Box className="title-register">
        <Typography
          sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
          variant="h4"
        >
          Create your account
        </Typography>
      </Box>
       <Box className="btn-container">
        <Button
          variant="outlined"
          startIcon={<GoogleIcon style={{ color: "#1976d2" }} />}
          className="google-btn"
        >
          Sign up with Google
        </Button>
        <Box className="box-main">
          <Typography className="box-content">OR</Typography>
        </Box>
      </Box>
      <Box className="login-form">
        <TextField
          className="input"
          required
          id="outlined-required"
          label="First name"
        />
         <TextField
          className="input"
          required
          id="outlined-required"
          label="Last name"
        />
        <TextField
          className="input"
          required
          id="outlined-required"
          label="Email Address"
        />
         <TextField
          className="input"
          required
          id="outlined-required"
          label="Mobile number"
        />
        <TextField
          required
          className="input"
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          required
          className="input"
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
        />
        <Box className="action-btn-register">
          <Button variant="contained">Signin</Button>
          <Button variant="text">Forgot Password</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Register