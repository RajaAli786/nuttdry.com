import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const savedCart = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart,
    shipping: 0,        // flat shipping or dynamic
    discount: 0,        // coupon / price discount
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.items.find((x) => x.id === item.id);

      if (exist) {
        exist.qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((x) => x.id !== id);

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((x) => x.id === id);

      if (item) item.qty = qty;

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },

    applyDiscount: (state, action) => {
      state.discount = action.payload; 
    },

    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
  },
});

// =========================
//        SELECTORS
// =========================

// Get all cart items
export const selectCartItems = (state) => state.cart.items;

// Total items count
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.qty, 0);

// Subtotal
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

// Final total with shipping & discount
export const selectCartGrandTotal = (state) => {
  const subtotal = state.cart.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return subtotal + state.cart.shipping - state.cart.discount;
};

// Shipping
export const selectShipping = (state) => state.cart.shipping;

// Discount
export const selectDiscount = (state) => state.cart.discount;

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  applyDiscount,
  setShipping,
} = cartSlice.actions;

export default cartSlice.reducer;
