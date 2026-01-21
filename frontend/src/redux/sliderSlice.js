
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./services/api";

export const fetchSliders = createAsyncThunk(
  "sliders/fetchSliders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/sliders", {
        params: { t: Date.now() },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  data: [],         
  loading: false,
  error: null,
  lastUpdated: null,
};

const sliderSlice = createSlice({
  name: "sliders",
  initialState,
  reducers: {
    forceRefresh: (state) => {
      state.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch sliders";
      });
  },
});
export const { forceRefresh } = sliderSlice.actions;
export const selectSliders = (state) => state.sliders.data;

export default sliderSlice.reducer;
