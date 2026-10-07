import { MIN_VOTES } from "./tmdbConfig";

// ===== Sort parameters =====
// Turns the app's sort names into TMDb discover parameters.
// sort: "popular" (default), "topRated" or "recent"

const getSortParams = (mediaType, sort = "popular") => {
  // Movies and series use different names for the release date
  const dateField =
    mediaType === "movie" ? "primary_release_date" : "first_air_date";

  if (sort === "topRated") {
    return {
      sort_by: "vote_average.desc",
      "vote_count.gte": MIN_VOTES.topRated,
    };
  }

  if (sort === "recent") {
    // Today as YYYY-MM-DD, so upcoming titles are left out
    const today = new Date().toISOString().slice(0, 10);

    return {
      sort_by: `${dateField}.desc`,
      [`${dateField}.lte`]: today,
      "vote_count.gte": MIN_VOTES.recent,
    };
  }

  return { sort_by: "popularity.desc" };
};

export default getSortParams;
