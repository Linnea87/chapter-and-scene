// ===== Pricing configuration =====
// TMDb has no prices, so the shop sets them with these rules.
// All prices are in USD.

// Titles released within this many years count as new releases
export const NEW_RELEASE_YEARS = 2;

// --- Movies ---
// Keys match the cart formats "rent" and "buy"
export const MOVIE_PRICES = {
  newRelease: { rent: 5.99, buy: 19.99 },
  oldRelease: { rent: 3.99, buy: 12.99 },
};

// --- Series ---
// Each season is priced by its own release year
export const SEASON_PRICES = {
  newRelease: 14.99,
  oldRelease: 9.99,
};

// The whole series costs the sum of all seasons minus this discount
export const SERIES_DISCOUNT = 0.2;
