import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import { loadCartItems } from "../features/cart/cartStorage";
import { tmdbApi } from "../services/tmdb/tmdbApi";
import { googleBooksApi } from "../services/googleBooks/googleBooksApi";

// ===== Store =====
// Single global store for the app. API services from RTK Query are added in CS-038.

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // RTK Query stores its cache here
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [googleBooksApi.reducerPath]: googleBooksApi.reducer,
  },
  // RTK Query needs its middleware to run requests and manage the cache
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tmdbApi.middleware,
      googleBooksApi.middleware,
    ),

  // Restores the guest cart saved in localStorage (CS-019)
  preloadedState: {
    cart: { cartItems: loadCartItems() },
  },
});

export default store;
