import { TMDB_IMAGE_BASE_URL } from "./tmdbConfig";

// Builds a full TMDb image URL. Smaller sizes load faster on mobile.
// Common sizes: w185, w342, w500, w780, original
const getImageUrl = (path, size = "w342") =>
  path ? `${TMDB_IMAGE_BASE_URL}${size}${path}` : null;

export default getImageUrl;
