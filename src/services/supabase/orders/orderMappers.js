// ===== Order mappers =====
// Convert between orders in the app and rows in orders and order_items.

import { isPhysicalFormat } from "../../../features/cart/cartHelpers";
import { getDeliveryStatus } from "../../../features/orders/orderHelpers";

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

// --- Database → app ---
// Same shape as a cart item, so CartItem can show it.
// The order date is needed to show if a book has been shipped, see getDeliveryStatus.
const toOrderItem = (row, orderCreatedAt) => ({
  key: row.id,
  id: row.external_id,
  mediaType: row.media_type,
  title: row.title,
  imageUrl: row.image_url,
  format: row.format,
  label: row.label,
  unitPrice: Number(row.unit_price),
  quantity: row.quantity,
  deliveryStatus: getDeliveryStatus(row.delivery_status, orderCreatedAt),
});

export const toOrder = (row) => ({
  id: row.id,
  createdAt: row.created_at,
  subtotal: Number(row.subtotal),
  discount: Number(row.discount),
  shipping: Number(row.shipping),
  total: Number(row.total),
  shippingAddress: row.shipping_address,
  items: row.order_items.map((item) => toOrderItem(item, row.created_at)),
});
