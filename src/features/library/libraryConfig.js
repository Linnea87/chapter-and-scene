// ===== Library configuration =====
// The sections on the My library page, in the order they are shown.
// Each section shows the items with its media type, rentals included.

export const LIBRARY_SECTIONS = [
  { id: "movies", title: "Movies", mediaType: "movie" },
  { id: "series", title: "Series", mediaType: "tv" },
  { id: "ebooks", title: "E-books", mediaType: "book" },
];

// Shown instead of the cart label for movies, e.g. "Buy" → "Purchased".
// Other formats keep their own label, e.g. "Season 2" or "E-book".
export const LIBRARY_LABELS = {
  rent: "Rental",
  buy: "Purchased",
};
