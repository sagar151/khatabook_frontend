import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import AddDialog from "../../components/AddDialog/AddDialog";
import { useDispatch, useSelector } from "react-redux";
import { getBorrower } from "../../redux/slices/borrowerSlice";
import { LocalStorageGet } from "../../utils/localstorage";

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const dispatch = useDispatch();
  // const { data, loading, error } = useSelector((state) => state.borrowers);
  // useEffect(() => {
  //   // dispatch(getBorrower());
  // }, [dispatch]);

  // console.log("data, loading, error", data, loading, error);
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
