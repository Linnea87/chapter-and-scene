import { DELIVERY_LABELS, PHYSICAL_FORMATS } from "./cartConfig";

// ===== Cart helpers =====

// Builds a unique key for a cart row.
// Media type is included because a movie and a series can share the same TMDb id,
// and format is included because the same story can be added in several formats.
export const createCartKey = (mediaType, id, format) =>
  `${mediaType}-${id}-${format}`;

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
