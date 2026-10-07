// ===== Home helpers =====

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

// --- Merge ---
// Combines movies and series, sorts them the same way TMDb did
// and keeps the first ones
export const mergeAndSortTitles = (movies, series, sort, limit) => {
  const field = SORT_FIELDS[sort];

  return [...movies, ...series]
    .sort((a, b) => compareDescending(a[field], b[field]))
    .slice(0, limit);
};
