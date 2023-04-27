import React from "react";
import { Box, Button } from "@mui/material";
import AddDialog from "../../components/AddDialog/AddDialog";

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Entry
        </Button>
      </Box>
      <AddDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default Dashboard;
