import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader";
import "./Redirect.css";

const Redirect = () => {
  const navigate=useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Box className="main-redirect">
      <Loader />
      { searchParams.get("token") ? (
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: "rgb(25, 118, 210)",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Congratulation
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "rgb(148, 144, 144)", textAlign: "center" }}
          >
            Successfully, Sign in with Google
          </Typography>
        </Box>
      ) : (
        <Box className="back-btn">
          <Typography
            variant="h4"
            sx={{
              color: "rgb(25, 118, 210)",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Something went to wrong,please try again!
          </Typography>
          <Button className="back-btn" variant="contained" onClick={()=>navigate('/')}>
            Go back
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Redirect;
