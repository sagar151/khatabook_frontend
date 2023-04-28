/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import AddDialog from "../../components/AddDialog/AddDialog";
import TableView from "../../components/Table/TableView";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { createBorrower } from "../../redux/slices/borrowerSlice";
import "./Debtor.css";

const Debtor = () => {
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const debounceOnSearchChange = debounce(handleChange, 500);

  useEffect(() => {
    handleSearchByAPI();
  }, [search]);

  const handleSearchByAPI = () => {
    const payload = {
      pageNum: 0,
      pageSize: 10,
      type: "DEBT",
      searchByDebtorName: search,
    };
    dispatch(createBorrower(payload));
  };
  return (
    <>
      <Box>
        <Box className="credit-title">
          <Typography className="title" variant="h3">
            DEBTOR
          </Typography>
          <Box className="title-right">
            <OutlinedInput
              id="search"
              type="text"
              name="search"
              onBlur={(e) => handleChange(e)}
              onChange={debounceOnSearchChange}
              placeholder="Search by debtor's name..."
              autoComplete="off"
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <AiOutlineSearch stroke={1.5} size="16px" />
                </InputAdornment>
              }
            />
            <Button
              className="add-btn"
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Add Entry
            </Button>
          </Box>
        </Box>
        <TableView type="DEBT" />
      </Box>
      <AddDialog open={open} handleClose={() => setOpen(false)} type="DEBT" />
    </>
  );
};

export default Debtor;
