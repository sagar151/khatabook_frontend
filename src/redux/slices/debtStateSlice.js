import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/AuthAPI";

export const getDebtState = createAsyncThunk(
  "debt/state",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await API("/total/paid", {
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

export const debtStateSlice = createSlice({
  name: "debtState",
  initialState: {
    debtState: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDebtState.pending, (state, action) => {
      if (state.loading === false) {
        state.loading = true;
      }
    });
    builder.addCase(getDebtState.fulfilled, (state, action) => {
      if (state.loading === true) {
        state.debtState = { ...action.payload.state };
        state.loading = false;
      }
    });
    builder.addCase(getDebtState.rejected, (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.error = action.payload;
      }
    });
  },
});
export default debtStateSlice.reducer;
