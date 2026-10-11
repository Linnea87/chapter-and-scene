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

// True when an owned format gives access to the format of a price option.
// The whole series includes every season, e.g. "series" covers "season-2".
const coversFormat = (ownedFormat, format) =>
  ownedFormat === format ||
  (ownedFormat === "series" && format.startsWith("season-"));

// Finds the library item for a format the user already has, e.g. a bought movie,
// a season of a bought series or an active rental. Expired rentals are not counted,
// so they can be bought again.
// item: a cart item from createCartItem
export const findOwnedItem = (libraryItems, item) =>
  libraryItems.find(
    (owned) =>
      owned.mediaType === item.mediaType &&
      owned.id === String(item.id) &&
      coversFormat(owned.format, item.format) &&
      !isRentalExpired(owned),
  );

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

// True when the library also has the same movie as a purchase
const isBought = (item, items) =>
  items.some(
    (other) =>
      other.mediaType === item.mediaType &&
      other.id === item.id &&
      other.format === "buy",
  );

// Returns the id of the section an item belongs to.
// Expired rentals go to History, everything else to the section for its media type.
const getSectionId = (item) => {
  if (isRentalExpired(item)) return "history";

  return LIBRARY_SECTIONS.find(
    (section) => section.mediaType === item.mediaType,
  )?.id;
};

// Splits the library into the sections in LIBRARY_SECTIONS.
// An expired rental is left out once the movie has been bought, since it is in Movies.
// Sections without items are left out, so no empty headings are shown.
export const groupBySection = (items) => {
  const visibleItems = items.filter(
    (item) => !(isRentalExpired(item) && isBought(item, items)),
  );

  return LIBRARY_SECTIONS.map((section) => ({
    ...section,
    items: visibleItems.filter((item) => getSectionId(item) === section.id),
  })).filter((section) => section.items.length > 0);
};
