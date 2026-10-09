// ===== Cart mappers =====
// Convert between a cart item in the app and a row in cart_items.

// --- App → database ---
export const toCartRow = (item) => ({
  key: item.key,
  media_type: item.mediaType,
  external_id: String(item.id),
  title: item.title,
  image_url: item.imageYrl ?? null,
  format: item.format,
  label: item.label,
  unit_price: item.unitPrice,
  quantity: item.quantity,
});

// --- Database → app ---
export const toCartItem = (row) => ({
  key: row.key,
  id: row.external_id,
  mediaType: row.media_type,
  title: row.title,
  imageUrl: row.image_url,
  format: row.format,
  label: row.label,
  unitPrice: Number(row.unit_price),
  quantity: row.quantity,
});
