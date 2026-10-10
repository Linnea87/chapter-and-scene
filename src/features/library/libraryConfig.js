// ===== Library configuration =====
// The sections on the My library page, in the order they are shown.
// Each section shows the items with its media type, rentals included.

export const LIBRARY_SECTIONS = [
  { id: "movies", title: "Movies", mediaType: "movie" },
  { id: "series", title: "Series", mediaType: "tv" },
  { id: "ebooks", title: "E-books", mediaType: "book" },
];

// Labels for rented movies, so they stand out from bought ones.
// Active rentals also show the time left, e.g. "Rented · 31 h left".
export const RENTAL_LABEL = "Rented";
export const EXPIRED_RENTAL_LABEL = "Rental expired";
