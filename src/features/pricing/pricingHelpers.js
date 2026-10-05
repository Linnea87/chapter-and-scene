import { MOVIE_PRICES, NEW_RELEASE_YEARS } from "./pricingConfig";

// ===== Pricing helpers =====

// --- Release age ---
// A missing year counts as an older title
export const isNewRelease = (year) => {
  if (!year) return false;

  const currentYear = new Date().getFullYear();
  return currentYear - Number(year) < NEW_RELEASE_YEARS;
};

// --- Movies ---
// Returns { rent, buy } for a movie based on its release year
export const getMoviePrices = (year) => isNewRelease(year) ? MOVIE_PRICES.newRelease : MOVIE_PRICES.oldRelease