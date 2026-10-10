import { isPhysicalFormat } from "../cart/cartHelpers";

// ===== Order helpers =====

// Short order number for display, e.g. "3f2a9c1e-…" → "3F2A9C1E".
// The full id is still used in the URL and the database.
export const formatOrderNumber = (orderId) => orderId.slice(0, 8).toUpperCase();

// True when at least one item goes to the library instead of being shipped
export const hasDigitalItems = (items) =>
  items.some((item) => !isPhysicalFormat(item.format));
