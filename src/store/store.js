import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import { loadCartItems, saveCartItems } from "../features/cart/cartStorage";
import { selectCartItems } from "../features/cart/cartSelectors";
import authReducer from "../features/auth/authSlice";
import { tmdbApi } from "../services/tmdb/tmdbApi";
import { googleBooksApi } from "../services/googleBooks/googleBooksApi";

// ===== Store =====
// Single global store for the app. API services from RTK Query are added in CS-038.

const store = configureStore({
  reducer: {
    auth: authReducer,
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

// ===== Cart persistence =====
// Saves the cart items whenever they change (CS-019).
// The store updates on every action, including API requests,
// so the cart is only saved when its items actually changed.

let previousCartItems = selectCartItems(store.getState());

store.subscribe(() => {
  const cartItems = selectCartItems(store.getState());
  if (cartItems === previousCartItems) return;

  previousCartItems = cartItems;
  saveCartItems(cartItems);
});

export default store;
