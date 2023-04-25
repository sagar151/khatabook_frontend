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
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import NetBanking from "../../mock/NetBanking.json";
import "./AddDialog.css";

const AddDialog = ({ open, handleClose }) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Dialog
      maxWidth={"lg"}
      fullWidth={"lg"}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add Record</DialogTitle>
      <DialogContent>
        <Box className="dialog-container">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              id="creditor-name"
              label="Creditor Name"
              variant="outlined"
            />
            <TextField
              id="debtor-name"
              label="Debtor Name"
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Payment Mode"
              onChange={handleChange}
            >
              {["", "CASH", "UPI", "NET BANKING"].map((item) => (
                <MenuItem value={item}>
                  {item === "" ? <em>None</em> : item}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={age}
              label="Payment Application"
              onChange={handleChange}
            >
              {NetBanking.map((item) => (
                <MenuItem value={item}>
                  {item.name === "" ? <em>None</em> : item.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker label="Pay Date" />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker label="Pay Back Date" />
            </LocalizationProvider>
          </Box>
          <Box sx={{ display: "flex" }}>
            <TextField
              id="principal-mount"
              label="Principal Amount"
              variant="outlined"
            />
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
                id="interest-rate"
                label="WhatsApp Number"
                variant="outlined"
              />
              <FormControl component="fieldset">
                <FormControlLabel
                  value="start"
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
              <TextField
                id="interest-rate"
                label="Interest Rate %"
                variant="outlined"
              />
              <FormControl component="fieldset">
                <FormControlLabel
                  value="start"
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
        <Button onClick={handleClose} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
