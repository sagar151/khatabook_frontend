import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { API } from "../../api/AuthAPI";
import { useDispatch } from "react-redux";
import { createBorrower } from "../../redux/slices/borrowerSlice";
import { Formik } from "formik";
import { PaymentSchema } from "../../utils/FormikSchema/PaymentSchema";
import "./PaymentDialog.css";

const PaymentDialog = ({ open, handleClose, type, record }) => {
  const dispatch = useDispatch();

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
          paidAmount: "",
          totalAmount: record?.totalAmount - record?.paidAmount ?? 0,
        }}
        validationSchema={PaymentSchema}
        onSubmit={async (values) => {
          try {
            const response = await API(`/borrower/paid/${record._id}`, {
              method: "PUT",
              data: values,
            });
            console.log("response", response);
            if (response) {
              if (response?.status === true) {
                toast.success(response?.message ?? "Successfully Payment.");
                const payload = {
                  pageNum: 0,
                  pageSize: 10,
                  type,
                };
                dispatch(createBorrower(payload));
                handleClose();
              }
              if (response?.data && !response?.data?.status) {
                toast.error(
                  response?.data?.message ??
                    "Something went to wrong, please try again"
                );
              }
            }
          } catch (error) {
            console.log("error", error);
            toast.error("Payment Failed, please try again later.");
          }
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "1.5rem",
              }}
            >
              <Box className="input-error-block">
                <TextField
                  type="texts"
                  id="totalAmount"
                  label="Remaining Amount"
                  name="totalAmount"
                  disabled
                  value={values.totalAmount}
                  onChange={handleChange}
                />
              </Box>
              <Box className="input-error-block">
                <TextField
                  type="number"
                  id="paidAmount"
                  label="Paid Amount"
                  name="paidAmount"
                  value={values.paidAmount}
                  onChange={handleChange}
                />
                <Typography>{errors.paidAmount}</Typography>
              </Box>
            </Box>
            <DialogActions sx={{ height: "40px" }}>
              <Box className="dialog-footer">
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Pay
                </Button>
              </Box>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};

export default PaymentDialog;
