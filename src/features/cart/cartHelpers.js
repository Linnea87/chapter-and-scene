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
