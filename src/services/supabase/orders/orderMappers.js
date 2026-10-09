import { isPhysicalFormat } from "../../../features/cart/cartHelpers";

// ===== Order mappers =====
// Convert a cart item in the app into a row in order_items.

// --- App → database ---
// Physical books start as "processing", digital items have no delivery status
export const toOrderItemRow = (item, orderId) => ({
  order_id: orderId,
  media_type: item.mediaType,
  external_id: String(item.id),
  title: item.title,
  image_url: item.imageUrl ?? null,
  format: item.format,
  label: item.label,
  unit_price: item.unitPrice,
  quantity: item.quantity,
  delivery_status: isPhysicalFormat(item.format) ? "processing" : null,
});
