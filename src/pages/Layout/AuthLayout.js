import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import loginpage from '../../assets/square4.jpg'
import Login from '../Login';
import "./AuthLayout.css"


const AuthLayout = () => {
  return (
    <Box className="main">
        <Grid container className='grid-container'>
            <Grid item xs={8} className='image-block' >
              {/* <img src={loginpage} alt="login"/> */}
            </Grid>
            <Grid item xs={4}><Login/>
            </Grid>
       </Grid>
    </Box>
  )
}

export default AuthLayout