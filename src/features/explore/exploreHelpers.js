import { ALL_ID } from "./exploreConfig";

// ===== Explore helpers =====

// --- Categories ---
// Returns the categories that exist for the chosen media type.
// A category with null genres for a type is hidden, e.g. Romance for series.
export const getAvailableCategories = (categories, mediaType) =>
  categories.filter((category) => {
    const hasMovies = category.movieGenres !== null;
    const hasSeries = category.tvGenres !== null;

    if (mediaType.id === "movie") return hasMovies;
    if (mediaType.id === "tv") return hasSeries;

    return hasMovies || hasSeries;
  });

// --- Search ---
// Keeps titles that have at least one of the category's genres.
// "" means no genre filter, null means the category does not exist for that type.
const matchesCategory = (title, category) => {
  const genres =
    title.mediaType === "movie" ? category.movieGenres : category.tvGenres;

  if (genres === null) return false;
  if (genres === "") return true;

  return genres.split("|").some((id) => title.genreIds.includes(Number(id)));
};

// TMDb search cannot filter on genre, so the chips are applied here
export const filterByMediaTypeAndCategory = (titles, mediaType, category) =>
  titles.filter(
    (title) =>
      (mediaType.id === ALL_ID || title.mediaType === mediaType.id) &&
      matchesCategory(title, category),
  );

// --- Pages ---
// Merges movie and series pages into one list.
// Each page pair is sorted by popularity on its own and added after the previous ones,
// so loading more never moves titles that are already shown.
// Duplicates are removed, since TMDb pages can shift between requests.
export const mergePages = (moviePages, seriesPages) => {
  const pageCount = Math.max(moviePages.length, seriesPages.length);
  const seen = new Set();
  const titles = [];

  for (let i = 0; i < pageCount; i += 1) {
    const page = [
      ...(moviePages[i]?.results ?? []),
      ...(seriesPages[i]?.results ?? []),
    ].sort((a, b) => b.popularity - a.popularity);

    page.forEach((title) => {
      const key = `${title.mediaType}-${title.id}`;

      if (!seen.has(key)) {
        seen.add(key);
        titles.push(title);
      }
    });
  }

  return titles;
};
