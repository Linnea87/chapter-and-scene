import {
  BOOK_PRICES,
  MOVIE_PRICES,
  NEW_RELEASE_YEARS,
  SEASON_PRICES,
  SERIES_DISCOUNT,
} from "./pricingConfig";

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
export const getMoviePrices = (year) =>
  isNewRelease(year) ? MOVIE_PRICES.newRelease : MOVIE_PRICES.oldRelease;

// --- Series ---
// Returns the price of one season based on its release year
export const getSeasonPrice = (year) =>
  isNewRelease(year) ? SEASON_PRICES.newRelease : SEASON_PRICES.oldRelease;

// Returns the package price for all seasons, rounded to a .99 price
export const getSeriesPrice = (seasons) => {
  const total = seasons.reduce(
    (sum, season) => sum + getSeasonPrice(season.year),
    0,
  );
  const discounted = total * (1 - SERIES_DISCOUNT);

  return Math.ceil(discounted) - 0.01;
};

// --- Books ---
// Returns { paperback, hardcover, ebook }.
// The e-book uses the Google Books price when there is one.
export const getBookPrices = (book) => ({
  paperback: BOOK_PRICES.paperback,
  hardcover: BOOK_PRICES.hardcover,
  ebook: book?.retailPrice ?? BOOK_PRICES.ebook,
});
