import { RENTAL_HOURS } from "../../../features/cart/cartConfig";

// ===== Library mappers =====
// Convert a purchased cart item into a row in library_items.

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
