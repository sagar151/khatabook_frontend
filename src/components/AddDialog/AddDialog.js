import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Formik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import NetBanking from "../../mock/NetBanking.json";
import UPI from "../../mock/UPI.json";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AddRecordSchema } from "../../utils/FormikSchema/AddRecordSchema";
import "./AddDialog.css";

const AddDialog = ({ open, handleClose }) => {

  return (
    <Dialog
      maxWidth="lg"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add Record</DialogTitle>

      <Formik
        initialValues={{
          debtorName: "",
          creditorName: "",
          debtorNumber: "",
          paymentMode: "",
          payDate: moment(new Date()),
          paybackDate: moment(new Date()),
          principalAmount: "",
          interestRate: 0,
          paymentApplication: "",
          isInterest: false,
          isWhatsapp: false,
        }}
        validationSchema={AddRecordSchema}
        onSubmit={(values) => {
          try {
            console.log("values is here---------------------->", values);
          } catch (error) {
            console.log("error is here---------------------->", error);
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
                  <Box sx={{ display: "flex", justifyItems: "space-between" }}>
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
                        id="debtorNumber"
                        name="debtorNumber"
                        type="number"
                        value={values.debtorNumber}
                        onChange={handleChange}
                        label="WhatsApp Number"
                        variant="outlined"
                      />
                      <Typography className="error">
                        {errors.debtorNumber}
                      </Typography>
                      <FormControl component="fieldset">
                        <FormControlLabel
                          id="isWhatsapp"
                          name="isWhatsapp"
                          value={values.isWhatsapp}
                          onChange={handleChange}
                          control={<Checkbox />}
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
                          control={<Checkbox />}
                          label="Interest"
                          labelPlacement="start"
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddDialog;
