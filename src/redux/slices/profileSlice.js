import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/AuthAPI";

export const getProfileState = createAsyncThunk(
  "profile/state",
  async (payload,{ rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await API("/profile/get", {
        method: "GET",
      });
      console.log('response is here--------------->',response)
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

export const profileStateSlice = createSlice({
  name: "profileState",
  initialState: {
    profileState: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileState.pending, (state, action) => {
      if (state.loading === false) {
        state.loading = true;
      }
    });
    builder.addCase(getProfileState.fulfilled, (state, action) => {
      if (state.loading === true) {
        state.profileState = { ...action.payload.user };
        state.loading = false;
      }
    });
    builder.addCase(getProfileState.rejected, (state, action) => {
      if (state.loading === true) {
        state.loading = false;
        state.error = action.payload;
      }
    });
  },
});

export default profileStateSlice.reducer;