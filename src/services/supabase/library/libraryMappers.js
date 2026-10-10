import { RENTAL_HOURS } from "../../../features/cart/cartConfig";

// ===== Library mappers =====
// Convert between purchased items in the app and rows in library_items.

// --- Helpers ---
// Rentals expire RENTAL_HOURS after purchase, everything else is kept forever
const getExpiresAt = (format) => {
  if (format !== "rent") return null;

  const expiresAt = new Date(Date.now() + RENTAL_HOURS * 60 * 60 * 1000);
  return expiresAt.toISOString();
};

// --- App → database ---
export const toLibraryRow = (item) => ({
  media_type: item.mediaType,
  external_id: String(item.id),
  title: item.title,
  image_url: item.imageUrl ?? null,
  format: item.format,
  label: item.label,
  expires_at: getExpiresAt(item.format),
});

// --- Database → app ---
export const toLibraryItem = (row) => ({
  key: row.id,
  id: row.external_id,
  mediaType: row.media_type,
  title: row.title,
  imageUrl: row.image_url,
  format: row.format,
  label: row.label,
  expiresAt: row.expires_at,
});
