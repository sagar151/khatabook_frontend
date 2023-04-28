import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { API } from "../../api/AuthAPI";
import "./DeleteDialog.css";
import { useDispatch } from "react-redux";
import { createBorrower } from "../../redux/slices/borrowerSlice";

const DeleteDialog = ({ open, handleClose, type, record }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const response = await API(`/delete/borrower/${record._id}`, {
        method: "DELETE",
      });

      if (response.status) {
        toast.success(response.message);
        const payload = {
          pageNum: 0,
          pageSize: 10,
          type,
        };
        dispatch(createBorrower(payload));
        handleClose();
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went to wrong,please try again");
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure to delete
          <span className="delete-name">
            {type === "CREDIT"
              ? record && record.creditorName
              : record && record.debtorName}
          </span>
          's record?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ height: "40px" }}>
        <Box className="dialog-footer">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained">
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
