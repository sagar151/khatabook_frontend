import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/AuthAPI";

export const getChartData = createAsyncThunk(
  "chart/state",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await API("/chart", {
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

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chart: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChartData.pending, (state, action) => {
      if (state.loading === false) {
        state.loading = true;
      }
    });
    builder.addCase(getChartData.fulfilled, (state, action) => {
      if (state.loading === true) {
        state.chart = [...action.payload.state];
        state.loading = false;
      }
    });
    builder.addCase(getChartData.rejected, (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.error = action.payload;
      }
    });
  },
});
export default chartSlice.reducer;
