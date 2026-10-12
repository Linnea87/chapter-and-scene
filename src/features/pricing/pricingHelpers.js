import {
  BOOK_PRICES,
  BUNDLE_DISCOUNT,
  MOVIE_PRICES,
  NEW_RELEASE_YEARS,
  SEASON_PRICES,
  SERIES_DISCOUNT,
} from "./pricingConfig";
import roundPrice from "../../utils/roundPrice";

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

// --- Bundle ---
// Returns the bundle discount for a cart, e.g. 1.95 for a $12.99 paperback
// bought together with its movie. Every book whose movie or series is also in
// the cart gets BUNDLE_DISCOUNT off. Removing either part removes the discount.
export const getBundleDiscount = (items) => {
  // The stories that have a movie or series in the cart
  const watchedStoryIds = new Set(
    items
      .filter((item) => item.mediaType !== "book" && item.storyId)
      .map((item) => item.storyId),
  );

  const discount = items
    .filter(
      (item) => item.mediaType === "book" && watchedStoryIds.has(item.storyId),
    )
    .reduce(
      (total, item) => total + item.unitPrice * item.quantity * BUNDLE_DISCOUNT,
      0,
    );

  return roundPrice(discount);
};
