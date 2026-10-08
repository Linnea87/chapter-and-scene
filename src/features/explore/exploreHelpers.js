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
// Keeps titles whose name contains the search term.
// Case-insensitive, and an empty term returns all titles.
export const filterTitlesBySearch = (titles, searchTerm) => {
  const term = searchTerm.trim().toLowerCase();

  if (!term) return titles;

  return titles.filter((title) => title.title.toLowerCase().includes(term));
};

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
