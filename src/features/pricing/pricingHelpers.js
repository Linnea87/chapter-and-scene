// ===== Pricing helpers =====
// Pure functions for prices: movies, seasons, whole series, books and bundles.

import {
  BOOK_PRICES,
  BUNDLE_DISCOUNT,
  BUNDLE_WATCH_FORMATS,
  MOVIE_PRICES,
  NEW_RELEASE_YEARS,
  SEASON_PRICES,
  SERIES_DISCOUNT,
} from "./pricingConfig";
import roundPrice from "../../utils/roundPrice";

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
// bought together with its movie. A book gets BUNDLE_DISCOUNT off when the whole
// story is in the cart too: the movie bought, or the whole series.
// Removing either part removes the discount.
export const getBundleDiscount = (items) => {
  // The stories that are bought as a whole, see BUNDLE_WATCH_FORMATS
  const boughtStoryIds = new Set(
    items
      .filter(
        (item) => BUNDLE_WATCH_FORMATS.includes(item.format) && item.storyId,
      )
      .map((item) => item.storyId),
  );

  const discount = items
    .filter(
      (item) => item.mediaType === "book" && boughtStoryIds.has(item.storyId),
    )
    .reduce(
      (total, item) => total + item.unitPrice * item.quantity * BUNDLE_DISCOUNT,
      0,
    );

  return roundPrice(discount);
};

// Returns the price of a bundle with one copy of the book, and the price
// without the bundle, e.g. { price: 21.69, regularPrice: 22.98 }.
// Uses the same rule as getBundleDiscount, so the cart shows the same total.
export const getBundlePrices = (watchPrice, bookPrice) => ({
  price: roundPrice(
    watchPrice + bookPrice - roundPrice(bookPrice * BUNDLE_DISCOUNT),
  ),
  regularPrice: roundPrice(watchPrice + bookPrice),
});
