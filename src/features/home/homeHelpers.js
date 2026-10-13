// ===== Home helpers =====
// Pure functions for the home rows: merging movies and series into one list.

import { sortTitles } from "../titles/titleHelpers";

// --- Merge ---
// Combines movies and series, sorts them the same way TMDb did
// and keeps the first ones
export const mergeAndSortTitles = (movies, series, sort, limit) =>
  sortTitles([...movies, ...series], sort).slice(0, limit);
