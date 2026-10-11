import { loadFromStorage, saveToStorage } from "../../services/storage/storage";
import {
  BASE_CURRENCY,
  CURRENCIES,
  CURRENCY_STORAGE_KEY,
} from "./currencyConfig";

// ===== Currency storage =====
// Loads and saves the selected currency in localStorage.

// --- Load ---
// Only a currency the shop offers is accepted, so old or edited data
// falls back to USD instead of breaking the prices
export const loadCurrency = () => {
  const savedCurrency = loadFromStorage(CURRENCY_STORAGE_KEY, BASE_CURRENCY);
  const isOffered = CURRENCIES.some(
    (currency) => currency.code === savedCurrency,
  );

  return isOffered ? savedCurrency : BASE_CURRENCY;
};

// --- Save ---
export const saveCurrency = (currency) => {
  saveToStorage(CURRENCY_STORAGE_KEY, currency);
};
