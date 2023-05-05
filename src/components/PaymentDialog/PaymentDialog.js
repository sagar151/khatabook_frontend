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
import { useDispatch } from "react-redux";
import { createBorrower } from "../../redux/slices/borrowerSlice";
import "./PaymentDialog.css";
import { Formik } from "formik";
import { PaymentSchema } from "../../utils/FormikSchema/PaymentSchema";

const PaymentDialog = ({ open, handleClose, type, record }) => {
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
      <DialogTitle id="alert-dialog-title">Payment</DialogTitle>
      <Formik
        initialValues={{
        paidAmount:''
        }}
        validationSchema={PaymentSchema}
        onSubmit={async (values) => {
          try {
            const response = await API(`/update/borrower/${record._id}`, {
              method: "PUT",
              data: values,
            });
            if (response.status === true) {
              toast.success(
                response.message ?? "Successfully created new entry."
              );
              const payload = {
                pageNum: 0,
                pageSize: 10,
                type,
              };
              dispatch(createBorrower(payload));
              handleClose();
            }
            if (!response.status) {
              toast.error(response?.message);
            }

            if (response.status === 400) {
              const keys = Object.keys(response.data.message.errors);
              toast.error(response.data.message.errors[keys[0]]);
            }
          } catch (error) {
            toast.error("Create Debtor Entry Failed, please try again later.");
          }
        }}
      ></Formik>
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

export default PaymentDialog;
