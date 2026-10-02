import { PHYSICAL_FORMATS } from "./cartConfig";

// ===== Cart helpers =====

// Builds a unique key for a cart row.
// Media type is included because a movie and a series can share the same TMDb id,
// and format is included because the same story can be added in several formats.
export const createCartKey = (mediaType, id, format) =>
  `${mediaType}-${id}-${format}`;

// Physical books are shipped, everything else is delivered digitally
export const isPhysicalFormat = (format) => PHYSICAL_FORMATS.includes(format);
