// ===== Explore helpers =====

// --- Search ---
// Keeps titles whose name contains the search term.
// Case-insensitive, and an empty term returns all titles.

export const filterTitlesBySearch = (titles, searchTerm) => {
  const term = searchTerm.trim().toLowerCase();

  if (!term) return titles;

  return titles.filter((title) => title.title.toLowerCase().includes(term));
};
