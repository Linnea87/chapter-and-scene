// ===== Order configuration =====
// Shared values for orders, kept in one place so they are easy to change

// Shown for physical books in an order. Keys match delivery_status in order_items.
export const DELIVERY_STATUS_LABELS = {
  processing: "Processing",
  shipped: "Shipped",
};

// The shop has no staff to ship books, so shipping is simulated:
// a book counts as shipped this many hours after the order was placed.
export const SHIPPED_AFTER_HOURS = 24;
