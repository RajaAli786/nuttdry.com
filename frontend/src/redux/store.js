import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import categoryReducer from "./categorySlice";
import headerReducer from "./headerSlice";
import menuSlice from "./menuSlice";
import sliderSlice from "./sliderSlice";
import authReducer from "./authSlice";
import couponReducer from "./couponSlice";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    header: headerReducer,
    menu: menuSlice,
    sliders: sliderSlice,
    auth: authReducer,
    coupon: couponReducer,
    category: categoryReducer
  },
});
