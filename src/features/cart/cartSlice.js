import { createSlice } from "@reduxjs/toolkit";
import { createCartKey, isPhysicalFormat } from "./cartHelpers";

const initialState = {
  cartItems: [],
};

// ===== Helpers =====
// Called from the reducers with Immer's draft state, so direct mutation is safe

const findItem = (state, key) =>
  state.cartItems.find((item) => item.key === key);

const removeByKey = (state, key) => {
  state.cartItems = state.cartItems.filter((item) => item.key !== key);
};

// ===== Slice =====
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Expects { id, mediaType, title, imageUrl, format, label, unitPrice }, see createCartItem
    addItem: (state, action) => {
      const { id, mediaType, format } = action.payload;
      const key = createCartKey(mediaType, id, format);
      const existingItem = findItem(state, key);

      if (existingItem) {
        // Digital items can only be in the cart once
        if (isPhysicalFormat(format)) {
          existingItem.quantity += 1;
        }
        return;
      }

      state.cartItems.push({ ...action.payload, key, quantity: 1 });
    },

    removeItem: (state, action) => {
      removeByKey(state, action.payload);
    },

    // Only physical books can change quantity
    increaseQuantity: (state, action) => {
      const item = findItem(state, action.payload);

      if (item && isPhysicalFormat(item.format)) {
        item.quantity += 1;
      }
    },

    // Stops at 1, the row is removed with removeItem
    decreaseQuantity: (state, action) => {
      const item = findItem(state, action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
