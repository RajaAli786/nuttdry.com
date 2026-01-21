import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoriesAPI } from "../api/categories";


export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    return await fetchCategoriesAPI();
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [],      
    loading: false,
    error: null,
  },

  // reducers: {
  //   setCategory(state, action) {
  //     state.category = action.payload;
  //   },
  // },


  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data; // 🔥 IMPORTANT
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
