import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/AuthAPI";

export const createBorrower = createAsyncThunk(
  "borrower/createBorrower",
  async (payload,{dispatch, getState, rejectWithValue, fulfillWithValue}) => {
    try {
      const response = await API("/create/borrower", {
        method: "POST",
        data: payload,
      });
      console.log("response is here--------------->", response);
      return response;
    } catch (error) {
      console.log(
        "error is hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        error
      );
      return error;
    }
  }
);

export const borrowerSlice = createSlice({
  name: "users",
  initialState: {
    data: {},
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBorrower.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(createBorrower.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = action.payload;
        state.loading = "idle";
      }
    });
    builder.addCase(createBorrower.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});
export default borrowerSlice.reducer;
