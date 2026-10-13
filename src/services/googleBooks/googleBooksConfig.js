// ===== Google Books configuration =====
// Addresses and limits for the Google Books API and its preview reader.

export const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1/";

// The preview reader that can be shown inside the app
export const GOOGLE_BOOKS_EMBED_URL = "https://books.google.com/books";

// Google's book reader, used when the preview cannot be shown inside the app.
// "_" stands in for the book's name in the address, the book is found by its id
export const GOOGLE_BOOKS_READER_URL =
  "https://www.google.com/books/edition/_/";

// A few results are enough to pick the best match
export const MAX_RESULTS = 5;
