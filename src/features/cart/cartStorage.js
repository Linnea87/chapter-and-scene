import { loadFromStorage, saveToStorage } from "../../services/storage/storage";
import { CART_STORAGE_KEY } from "./cartConfig";

// ===== Cart storage =====
// Loads and saves the guest cart items in localStorage.

// --- Load ---
// Only an array is accepted, so old or edited data cannot break the cart
export const loadCartItems = () => {
  const savedItems = loadFromStorage(CART_STORAGE_KEY, []);
  return Array.isArray(savedItems) ? savedItems : [];
};

// --- Save ---
export const saveCartItems = (cartItems) => {
  saveToStorage(CART_STORAGE_KEY, cartItems);
};
