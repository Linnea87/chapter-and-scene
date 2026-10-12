import { DELIVERY_LABELS, PHYSICAL_FORMATS } from "./cartConfig";

// ===== Cart helpers =====

// Builds a unique key for a cart row.
// Media type is included because a movie and a series can share the same TMDb id,
// and format is included because the same story can be added in several formats.
export const createCartKey = (mediaType, id, format) =>
  `${mediaType}-${id}-${format}`;

// Links the items that belong to the same story, e.g. "movie-671" for a
// Harry Potter movie and the book behind it. Used for the bundle discount.
export const createStoryId = (mediaType, id) => `${mediaType}-${id}`;

// Physical books are shipped, everything else is delivered digitally
export const isPhysicalFormat = (format) => PHYSICAL_FORMATS.includes(format);

// Returns the delivery text for a format, e.g. "paperback" → "Delivered in 2–4 days"
export const getDeliveryLabel = (format) =>
  isPhysicalFormat(format) ? DELIVERY_LABELS.physical : DELIVERY_LABELS.digital;

// Builds the cart item for one price option.
// product: { id, mediaType, title, imageUrl } — the movie, series or book
// option: { id, label, price } — e.g. rent, season-2 or paperback
export const createCartItem = (product, option) => ({
  ...product,
  format: option.id,
  label: option.label,
  unitPrice: option.price,
});

// True when two cart items give access to the same story twice, so only one
// of them should be bought: renting and buying the same movie, or the whole
// series together with one of its seasons. Book formats never clash, since
// a paperback and an e-book are different products.
const isConflict = (a, b) => {
  const isSameStory =
    a.mediaType === b.mediaType && String(a.id) === String(b.id);

  if (!isSameStory || a.format === b.format) return false;
  if (a.mediaType === "movie") return true;
  if (a.mediaType === "tv")
    return a.format === "series" || b.format === "series";

  return false;
};

// Returns the cart items that clash with an item that is about to be added,
// e.g. the rental when the user adds "Buy" for the same movie
export const findConflictingItems = (cartItems, item) =>
  cartItems.filter((cartItem) => isConflict(cartItem, item));

// Merges the guest cart into the account cart after login.
// Same key means the same row: the larger quantity is kept.
// Digital items always have quantity 1, so they stay only once.
export const mergeCartItems = (guestItems, accountItems) => {
  const merged = accountItems.map((item) => ({ ...item }));

  guestItems.forEach((guestItem) => {
    const existingItem = merged.find((item) => item.key === guestItem.key);

    if (existingItem) {
      existingItem.quantity = Math.max(
        existingItem.quantity,
        guestItem.quantity,
      );
      return;
    }

    merged.push(guestItem);
  });

  return merged;
};
