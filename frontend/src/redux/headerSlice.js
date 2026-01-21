import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../redux/services/api";

// API Call
export const fetchHeaderSettings = createAsyncThunk(
  "header/fetchHeaderSettings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/header-setting", {
        params: { t: Date.now() },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const headerSlice = createSlice({
  name: "header",
  initialState: {
    data: null,
    loading: false,
    error: null,
    lastUpdated: null, 
  },

  reducers: {
    forceRefresh: (state) => {
      state.lastUpdated = Date.now(); // manual trigger
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchHeaderSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeaderSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastUpdated = Date.now(); // save timestamp for re-renders
      })
      .addCase(fetchHeaderSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { forceRefresh } = headerSlice.actions;
export default headerSlice.reducer;
