// ===== TMDb configuration =====
// Shared values for all TMDb requests

export const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// TMDb keywords for book adaptations. A title needs at least one of them.
// 818: "based on novel or book"
// 246466: "based on young adult novel"
// 15101: "based on children's book"
export const BOOK_KEYWORD_IDS = [818, 246466, 15101];

// Number of search results per media type that are checked for a book keyword.
// Each result needs its own request, so the number is kept small.
export const SEARCH_CANDIDATE_LIMIT = 10;

export const LANGUAGE = "en-US";

// Number of cast members shown on a detail page
export const CAST_LIMIT = 8;

// Crew jobs that point to the writer of the original book
export const AUTHOR_JOBS = ["Novel", "Book", "Author"];

// Minimum number of votes per sort order, so titles with only a few votes
// are left out of "top rated" and unknown titles out of "recent"
export const MIN_VOTES = {
  topRated: 300,
  recent: 20,
};

// --- Age ratings ---
// Extra data to append for each media type, since movies and series
// keep their age ratings in different places
export const CERTIFICATION_APPEND = {
  movie: "release_dates",
  tv: "content_ratings",
};

// Countries to look for, in order. The site is American first,
// so the US rating is used, with Sweden as a fallback
export const CERTIFICATION_COUNTRIES = ["US", "SE"];

// Shows ratings as ages, e.g. "PG-13" becomes "13+".
// Swedish ratings are already numbers and get "+" in findCertification.
export const CERTIFICATION_LABELS = {
  // US movies
  G: "All ages",
  PG: "7+",
  "PG-13": "13+",
  R: "17+",
  "NC-17": "18+",
  // US series
  "TV-Y": "All ages",
  "TV-Y7": "7+",
  "TV-G": "All ages",
  "TV-PG": "10+",
  "TV-14": "14+",
  "TV-MA": "17+",
  // Sweden
  Btl: "All ages",
};
