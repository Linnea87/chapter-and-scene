// ===== Currency slice =====
// The currency that prices are converted to. The shop always charges in USD.

import { createSlice } from "@reduxjs/toolkit";
import { BASE_CURRENCY } from "./currencyConfig";

// --- State ---
// The currency the visitor has chosen. Restored from localStorage in the store.

const initialState = {
  currency: BASE_CURRENCY,
};

// --- Slice ---
const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    // Expects a currency code from CURRENCIES, e.g. "SEK"
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
