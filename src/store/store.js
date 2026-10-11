import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import { loadCartItems, saveCartItems } from "../features/cart/cartStorage";
import { selectCartItems } from "../features/cart/cartSelectors";
import authReducer from "../features/auth/authSlice";
import currencyReducer from "../features/currency/currencySlice";
import {
  loadCurrency,
  saveCurrency,
} from "../features/currency/currencyStorage";
import { selectCurrency } from "../features/currency/currencySelectors";
import { tmdbApi } from "../services/tmdb/tmdbApi";
import { googleBooksApi } from "../services/googleBooks/googleBooksApi";
import { supabaseApi } from "../services/supabase/supabaseApi";
import { frankfurterApi } from "../services/frankfurter/frankfurterApi";

// ===== Store =====
// Single global store for the app. API services from RTK Query are added in CS-038,
// the Supabase service in CS-027 and the Frankfurter service in CS-044.

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    currency: currencyReducer,
    // RTK Query stores its cache here
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    [googleBooksApi.reducerPath]: googleBooksApi.reducer,
    [supabaseApi.reducerPath]: supabaseApi.reducer,
    [frankfurterApi.reducerPath]: frankfurterApi.reducer,
  },
  // RTK Query needs its middleware to run requests and manage the cache
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tmdbApi.middleware,
      googleBooksApi.middleware,
      supabaseApi.middleware,
      frankfurterApi.middleware,
    ),

  // Restores the guest cart (CS-019) and the selected currency (CS-044) from localStorage
  preloadedState: {
    cart: { cartItems: loadCartItems() },
    currency: { currency: loadCurrency() },
  },
});

// ===== Persistence =====
// Saves the cart items (CS-019) and the selected currency (CS-044) whenever they change.
// The store updates on every action, including API requests,
// so each value is only saved when it actually changed.

let previousCartItems = selectCartItems(store.getState());
let previousCurrency = selectCurrency(store.getState());

store.subscribe(() => {
  const state = store.getState();
  const cartItems = selectCartItems(state);
  const currency = selectCurrency(state);

  if (cartItems !== previousCartItems) {
    previousCartItems = cartItems;
    saveCartItems(cartItems);
  }

  if (currency !== previousCurrency) {
    previousCurrency = currency;
    saveCurrency(currency);
  }
});

export default store;
