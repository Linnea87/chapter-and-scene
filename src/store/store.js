import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import { tmdbApi } from "../services/tmdb/tmdbApi";

// ===== Store =====
// Single global store for the app. API services from RTK Query are added in CS-038.

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // RTK Query stores its cache here
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  // RTK Query needs its middleware to run requests and manage the cache
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export default store;
