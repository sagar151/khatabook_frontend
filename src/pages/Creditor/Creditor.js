import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "./Creditor.css";
import AddDialog from "../../components/AddDialog/AddDialog";
import TableView from "../../components/Table/TableView";

const Creditor = () => {
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
        <Box className="credit-title">
          <Typography className="title" variant="h3">
            CREDITOR
          </Typography>
          <Button className="add-btn" variant="contained" onClick={handleClickOpen}>
            Add Entry
          </Button>
        </Box>
        <TableView type="CREDIT"/>
      </Box>
      <AddDialog open={open} handleClose={handleClose} type="CREDIT"/>
    </>
  );
};

export default Creditor;
