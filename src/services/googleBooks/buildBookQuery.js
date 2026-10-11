// ===== Build book query =====
// Builds the Google Books search text from a title and an author.
// Plain text search is used, since the intitle:/inauthor: operators
// currently return no results from Google Books.

const buildBookQuery = (title, author) =>
  [title, author].filter(Boolean).join(" ");

export default buildBookQuery;
