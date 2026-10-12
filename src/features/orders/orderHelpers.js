import { isPhysicalFormat } from "../cart/cartHelpers";
import { SHIPPED_AFTER_HOURS } from "./orderConfig";
import msToHours from "../../utils/msToHours";

// ===== Order helpers =====

// Short order number for display, e.g. "3f2a9c1e-…" → "3F2A9C1E".
// The full id is still used in the URL and the database.
export const formatOrderNumber = (orderId) => orderId.slice(0, 8).toUpperCase();

// True when at least one item goes to the library instead of being shipped
export const hasDigitalItems = (items) =>
  items.some((item) => !isPhysicalFormat(item.format));

// Total number of items in an order, counting quantity,
// e.g. two copies of a paperback and one rental → 3
export const getItemCount = (items) =>
  items.reduce((total, item) => total + item.quantity, 0);

// Returns the delivery status to show for an order item.
// Digital items have no status (null). A book still "processing" counts as
// "shipped" once SHIPPED_AFTER_HOURS have passed, see orderConfig.
export const getDeliveryStatus = (savedStatus, orderCreatedAt) => {
  if (savedStatus !== "processing") return savedStatus;

  const hoursSinceOrder = msToHours(Date.now() - new Date(orderCreatedAt));
  return hoursSinceOrder >= SHIPPED_AFTER_HOURS ? "shipped" : "processing";
};
