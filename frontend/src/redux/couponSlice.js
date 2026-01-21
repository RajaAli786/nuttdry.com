import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { applyCouponAPI } from "../api/coupon";

/* =========================
   APPLY COUPON THUNK
========================= */
export const applyCoupon = createAsyncThunk(
  "coupon/apply",
  async ({ code, subtotal }, { rejectWithValue }) => {
    try {
      const res = await applyCouponAPI({ code, subtotal });
      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid coupon"
      );
    }
  }
);

/* =========================
   SLICE
========================= */
const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    code: null,
    discount: 0,
    loading: false,
    error: null,
    applied: false,
  },

  reducers: {
    clearCoupon: (state) => {
      state.code = null;
      state.discount = 0;
      state.applied = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* APPLY */
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.applied = true;
        state.code = action.payload.code;
        state.discount = action.payload.discount;
      })

      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.discount = 0;
        state.applied = false;
        state.error = action.payload;
      });
  },
});

/* =========================
   EXPORTS
========================= */
export const { clearCoupon } = couponSlice.actions;

export const selectCouponDiscount = (state) => state.coupon.discount;
export const selectCouponApplied = (state) => state.coupon.applied;
export const selectCouponLoading = (state) => state.coupon.loading;
export const selectCouponError = (state) => state.coupon.error;

export default couponSlice.reducer;
