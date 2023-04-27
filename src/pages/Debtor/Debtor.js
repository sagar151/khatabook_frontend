import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddDialog from "../../components/AddDialog/AddDialog";
import TableView from "../../components/Table/TableView";

const Debtor = () => {
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
            DEBTOR
          </Typography>
          <Button
            className="add-btn"
            variant="contained"
            onClick={handleClickOpen}
          >
            Add Entry
          </Button>
        </Box>
        <TableView type="DEBT" />
      </Box>
      <AddDialog open={open} handleClose={handleClose} type="DEBT" />
    </>
  );
};

export default Debtor;
