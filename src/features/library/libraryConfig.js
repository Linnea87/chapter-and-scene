// ===== Library configuration =====
// The sections on the My library page, in the order they are shown.
// Each section shows the items with its media type. Expired rentals
// are collected in their own section at the end, see getSectionId.

export const LIBRARY_SECTIONS = [
  { id: "movies", title: "Movies", mediaType: "movie" },
  { id: "series", title: "Series", mediaType: "tv" },
  { id: "ebooks", title: "E-books", mediaType: "book" },
  { id: "history", title: "History" },
];

// Labels for rented movies, so they stand out from bought ones.
// Active rentals also show the time left, e.g. "Rented · 31 h left".
export const RENTAL_LABEL = "Rented";
export const EXPIRED_RENTAL_LABEL = "Rental expired";

// Shown under the video in the player, since the shop has no full movies or series
export const PLAYER_NOTICE =
  "Demo: the trailer is shown in place of the full movie or series.";
