// ===== Get image URL =====
// Builds a full TMDb image URL. Smaller sizes load faster on mobile.
// Common sizes: w185, w342, w500, w780, original
// Returns null when there is no image path.

import { TMDB_IMAGE_BASE_URL } from "./tmdbConfig";

const getImageUrl = (path, size = "w342") =>
  path ? `${TMDB_IMAGE_BASE_URL}${size}${path}` : null;

export default getImageUrl;
