import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

// ===== Store =====
// Single global store for the app. API services from RTK Query are added in CS-038.

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
