import {
  EXPIRED_RENTAL_LABEL,
  LIBRARY_SECTIONS,
  RENTAL_LABEL,
} from "./libraryConfig";

// ===== Library helpers =====

// Milliseconds in one hour, used to turn a time difference into hours
const MS_PER_HOUR = 60 * 60 * 1000;

// Returns the hours left on a rental, rounded up, e.g. 30.2 → 31.
// Returns 0 when the rental has expired.
export const getHoursLeft = (expiresAt) => {
  const msLeft = new Date(expiresAt) - Date.now();

  return Math.max(0, Math.ceil(msLeft / MS_PER_HOUR));
};

// True for a rented movie whose time has run out. Bought items never expire.
export const isRentalExpired = (item) =>
  item.format === "rent" && getHoursLeft(item.expiresAt) === 0;

// Returns the label shown in My library, or null when none is needed.
// Rentals show the time left or that they have expired, bought movies need no label,
// seasons and e-books keep their own label, e.g. "Season 2" or "E-book".
export const getLibraryLabel = (item) => {
  if (isRentalExpired(item)) return EXPIRED_RENTAL_LABEL;
  if (item.format === "rent") {
    return `${RENTAL_LABEL} · ${getHoursLeft(item.expiresAt)} h left`;
  }
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
