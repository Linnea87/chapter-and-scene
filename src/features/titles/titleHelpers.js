// ===== Title helpers =====
// Shared by the home page and the browse page.

// Which title field each sort order compares, see getSortParams
const SORT_FIELDS = {
  popular: "popularity",
  topRated: "rating",
  recent: "releaseDate",
};

// Highest first. Works for numbers and for dates like "2024-11-22"
const compareDescending = (a, b) => {
  if (a === b) return 0;
  return a < b ? 1 : -1;
};

// Sorts movies and series the same way TMDb did, e.g. newest first for "recent".
// sort: "popular", "topRated" or "recent"
export const sortTitles = (titles, sort) => {
  const field = SORT_FIELDS[sort];

  return [...titles].sort((a, b) => compareDescending(a[field], b[field]));
};
