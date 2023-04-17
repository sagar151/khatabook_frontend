import * as React from 'react';
import Box from '@mui/material/Box';
import "./Login.css"
import { Button, Typography } from '@mui/material';

const Login = () => {
  return (
    <Box className="main">
      <Typography>This is Login page</Typography>
      <Button>Login</Button>
    </Box>
  )
}

export default Login