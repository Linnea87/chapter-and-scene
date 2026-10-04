// ===== Explore categories =====
// Shared categories that map to TMDb movie and TV genre IDs.
// "|" means OR in TMDb's with_genres parameter.
// An empty string means no genre filter (All).
// null means there is no matching genre, so that media type is skipped.

export const DEFAULT_CATEGORY_ID = "all";

export const CATEGORIES = [
  { id: "all", label: "All", movieGenres: "", tvGenres: "" },
  { id: "drama", label: "Drama", movieGenres: "18", tvGenres: "18" },
  { id: "romance", label: "Romance", movieGenres: "10749", tvGenres: "null" },
  {
    id: "mystery-crime",
    label: "Mystery & Crime",
    movieGenres: "80|9648",
    tvGenres: "80|9648",
  },
  {
    id: "fantasy-scifi",
    label: "Fantasy & Sci-Fi",
    movieGenres: "14|878",
    tvGenres: "10765",
  },
  {
    id: "thriller-horror",
    label: "Thriller & Horror",
    movieGenres: "53|27",
    tvGenres: "null",
  },
  {
    id: "action-adventure",
    label: "Action & Adventure",
    movieGenres: "28|12",
    tvGenres: "10759",
  },
  { id: "comedy", label: "Comedy", movieGenres: "35", tvGenres: "35" },
  {
    id: "family",
    label: "Family",
    movieGenres: "10751|16",
    tvGenres: "10751|10762",
  },
  {
    id: "history-war",
    label: "History & War",
    movieGenres: "36|10752",
    tvGenres: "10768",
  },
];

// ===== Helpers =====
// Falls back to "All" if the id is unknown, e.g. a typo in the URL.
export const getCategoryById = (id) =>
  CATEGORIES.find((category) => category.id === id) ?? CATEGORIES[0];
