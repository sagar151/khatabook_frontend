import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/AuthAPI";

export const createBorrower = createAsyncThunk(
  "borrower/list",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await API("/borrower/list", {
        method: "GET",
        params: payload,
      });
      if (response.status === true) {
        return fulfillWithValue(response);
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const borrowerSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    total:0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBorrower.pending, (state, action) => {
      if (state.loading === false) {
        state.loading = true;
      }
    });
    builder.addCase(createBorrower.fulfilled, (state, action) => {
      if (state.loading === true) {
        console.log('action.payload',action.payload)
        state.data = [...action.payload.Debtor];
        state.total=action.payload.total
        state.loading = false;
      }
    });
    builder.addCase(createBorrower.rejected, (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.error = action.payload;
      }
    });
  },
});
export default borrowerSlice.reducer;
