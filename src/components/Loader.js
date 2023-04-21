import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loader.css'

export default function Loader() {
  return (
    <Box className="main-loader">
      <CircularProgress sx={{color:"rgb(148, 144, 144)"}} />
    </Box>
  );
}