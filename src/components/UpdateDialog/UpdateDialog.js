import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import NetBanking from "../../mock/NetBanking.json";
import UPI from "../../mock/UPI.json";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AddRecordSchema } from "../../utils/FormikSchema/AddRecordSchema";
import { createBorrower } from "../../redux/slices/borrowerSlice";
import { API } from "../../api/AuthAPI";
import "./UpdateDialog.css";

const UpdateDialog = ({ open, handleClose, type = "CREDIT", record }) => {
  const dispatch = useDispatch();
  return (
    record && (
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Record</DialogTitle>

        <Formik
          initialValues={{
            debtorName: record.debtorName,
            creditorName: record.creditorName,
            contactNumber: record.contactNumber,
            paymentMode: record.paymentMode,
            payDate: moment(record.payDate),
            paybackDate: moment(record.paybackDate),
            principalAmount: record.principalAmount,
            interestRate: record.interestRate ?? 0,
            paymentApplication: record.paymentApplication,
            isInterest: record.isInterest,
            isWhatsapp: record.isWhatsapp,
            type: record.type,
          }}
          validationSchema={AddRecordSchema}
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
              toast.error(
                "Create Debtor Entry Failed, please try again later."
              );
            }
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            getFieldProps,
            errors,
          }) => {
            const list =
              getFieldProps("paymentMode").value === "UPI" ? UPI : NetBanking;
            return (
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <Box className="dialog-container">
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box className="input-error-block">
                        <TextField
                          type="text"
                          id="creditorName"
                          name="creditorName"
                          value={values.creditorName}
                          onChange={handleChange}
                          label="Creditor Name"
                          variant="outlined"
                        />
                        <Typography>{errors.creditorName}</Typography>
                      </Box>
                      <Box className="input-error-block">
                        <TextField
                          type="text"
                          id="debtorName"
                          name="debtorName"
                          value={values.debtorName}
                          onChange={handleChange}
                          label="Debtor Name"
                          variant="outlined"
                        />
                        <Typography>{errors.debtorName}</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box className="input-error-block">
                        <TextField
                          select
                          id="paymentMode"
                          name="paymentMode"
                          value={values.paymentMode}
                          label="Payment Mode"
                          onChange={handleChange}
                        >
                          {["", "CASH", "UPI", "NET BANKING"].map(
                            (item, index) => (
                              <MenuItem value={item} key={index}>
                                {item === "" ? <em>None</em> : item}
                              </MenuItem>
                            )
                          )}
                        </TextField>
                        <Typography>{errors.paymentMode}</Typography>
                      </Box>
                      <Box className="input-error-block">
                        {["UPI", "NET BANKING"].includes(
                          getFieldProps("paymentMode").value
                        ) && (
                          <>
                            <TextField
                              select
                              id="paymentApplication"
                              name="paymentApplication"
                              value={values.paymentApplication}
                              label="Payment Application"
                              onChange={handleChange}
                            >
                              {list.map((item, index) => (
                                <MenuItem value={item} key={index}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </TextField>
                            <Typography>{errors.paymentApplication}</Typography>
                          </>
                        )}
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box className="input-error-block">
                        <TextField
                          select
                          id="type"
                          name="type"
                          value={values.type}
                          label="Type"
                          onChange={handleChange}
                        >
                          {["DEBT", "CREDIT"].map((item, index) => (
                            <MenuItem value={item} key={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </TextField>
                        <Typography>{errors.type}</Typography>
                      </Box>
                      <Box className="input-error-block"></Box>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box className="input-error-block">
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DatePicker
                            label="Pay Date"
                            value={values.payDate}
                            onChange={(value) =>
                              setFieldValue(
                                "payDate",
                                moment(value).local().toDate()
                              )
                            }
                          />
                        </LocalizationProvider>
                        <Typography>{errors.payDate}</Typography>
                      </Box>
                      <Box className="input-error-block">
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DatePicker
                            label="Pay Back Date"
                            value={values.paybackDate}
                            onChange={(value) =>
                              setFieldValue(
                                "paybackDate",
                                moment(value).local().toDate()
                              )
                            }
                          />
                        </LocalizationProvider>
                        <Typography>{errors.paybackDate}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Box className="input-error-block" sx={{ width: "50%" }}>
                        <TextField
                          id="principalAmount"
                          name="principalAmount"
                          type="number"
                          value={values.principalAmount}
                          onChange={handleChange}
                          label="Principal Amount"
                          variant="outlined"
                        />
                        <Typography>{errors.principalAmount}</Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyItems: "space-between" }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextField
                          id="contactNumber"
                          name="contactNumber"
                          type="number"
                          value={values.contactNumber}
                          onChange={handleChange}
                          label="Contact Number"
                          variant="outlined"
                        />
                        <Typography className="error">
                          {errors.contactNumber}
                        </Typography>
                        <FormControl component="fieldset">
                          <FormControlLabel
                            id="isWhatsapp"
                            name="isWhatsapp"
                            value={values.isWhatsapp}
                            onChange={handleChange}
                            control={<Checkbox checked={values.isWhatsapp} />}
                            label="Is It WhatsApp Number ?"
                            labelPlacement="start"
                          />
                        </FormControl>
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        {getFieldProps("isInterest").value === true && (
                          <>
                            <TextField
                              id="interestRate"
                              name="interestRate"
                              type="number"
                              value={values.interestRate}
                              onChange={handleChange}
                              label="Interest Rate %"
                              variant="outlined"
                            />
                            <Typography className="error">
                              {errors.interestRate}
                            </Typography>
                          </>
                        )}
                        <FormControl component="fieldset">
                          <FormControlLabel
                            id="isInterest"
                            name="isInterest"
                            value={values.isInterest}
                            onChange={handleChange}
                            control={<Checkbox checked={values.isInterest} />}
                            label="Interest"
                            labelPlacement="start"
                          />
                        </FormControl>
                      </Box>
                    </Box>
                  </Box>
                </DialogContent>
                <Divider />
                <DialogActions sx={{ height: "50px" }}>
                  <Box className="dialog-footer">
                    <Button onClick={handleClose} variant="outlined">
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                      Save
                    </Button>
                  </Box>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
      </Dialog>
    )
  );
};

export default UpdateDialog;
