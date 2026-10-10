import { LIBRARY_SECTIONS, RENTAL_LABEL } from "./libraryConfig";

// ===== Library helpers =====

// Returns the label shown in My library, or null when none is needed.
// Rented movies are marked, bought movies need no label,
// seasons and e-books keep their own label, e.g. "Season 2" or "E-book".
export const getLibraryLabel = (item) => {
  if (item.format === "rent") return RENTAL_LABEL;
  if (item.format === "buy") return null;

  return item.label;
};

// Splits the library into the sections in LIBRARY_SECTIONS.
// Sections without items are left out, so no empty headings are shown.
export const groupBySection = (items) =>
  LIBRARY_SECTIONS.map((section) => ({
    ...section,
    items: items.filter((item) => item.mediaType === section.mediaType),
  })).filter((section) => section.items.length > 0);
