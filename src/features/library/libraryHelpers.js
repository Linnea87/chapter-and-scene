import { LIBRARY_LABELS, LIBRARY_SECTIONS } from "./libraryConfig";

// ===== Library helpers =====

// Returns the label shown in My library, e.g. "Rental", "Season 2" or "E-book"
export const getLibraryLabel = (item) =>
  LIBRARY_LABELS[item.format] ?? item.label;

// Splits the library into the sections in LIBRARY_SECTIONS.
// Sections without items are left out, so no empty headings are shown.
export const groupBySection = (items) =>
  LIBRARY_SECTIONS.map((section) => ({
    ...section,
    items: items.filter((item) => item.mediaType === section.mediaType),
  })).filter((section) => section.items.length > 0);
