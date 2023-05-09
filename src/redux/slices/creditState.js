import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/AuthAPI";

export const getCreditState = createAsyncThunk(
  "credit/state",
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

export const creditStateSlice = createSlice({
  name: "creditState",
  initialState: {
    creditState: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCreditState.pending, (state, action) => {
      if (state.loading === false) {
        state.loading = true;
      }
    });
    builder.addCase(getCreditState.fulfilled, (state, action) => {
      if (state.loading === true) {
        state.creditState = { ...action.payload.state };
        state.loading = false;
      }
    });
    builder.addCase(getCreditState.rejected, (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.error = action.payload;
      }
    });
  },
});
export default creditStateSlice.reducer;
