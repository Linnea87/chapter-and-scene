// ===== Currency configuration =====
// The currencies a visitor can choose. The shop charges in USD,
// other currencies are only shown as an approximate conversion.
// Exchange rates come from the Frankfurter API.

export const BASE_CURRENCY = "USD";

// Options for the currency selector, in the order they are shown
export const CURRENCIES = [
  { code: "USD", label: "USD" },
  { code: "SEK", label: "SEK" },
  { code: "GBP", label: "GBP" },
];

// --- Storage ---
// Key for the selected currency in localStorage
export const CURRENCY_STORAGE_KEY = "chapter-and-scene-currency";
