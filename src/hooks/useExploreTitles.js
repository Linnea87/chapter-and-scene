import { useDiscoverTitlesQuery } from "../services/tmdb/tmdbApi";
import { CATEGORIES, MEDIA_TYPES } from "../features/explore/exploreConfig";

// ===== useExploreTitles =====
// Fetches book adaptations for the selected media type and category
// and merges movies and series into one list. Defaults to "All".

const useExploreTitles = ({
  category = CATEGORIES[0],
  mediaType = MEDIA_TYPES[0],
} = {}) => {
  // --- Which requests to send ---
  // A media type is skipped if it is filtered out or has no matching genre
  const includeMovies = mediaType.id !== "tv" && category.movieGenres !== null;
  const includeSeries = mediaType.id !== "movie" && category.tvGenres !== null;

  // --- Requests ---
  const movies = useDiscoverTitlesQuery(
    { mediaType: "movie", genres: category.movieGenres },
    { skip: !includeMovies },
  );
  const series = useDiscoverTitlesQuery(
    { mediaType: "tv", genres: category.tvGenres },
    { skip: !includeSeries },
  );

  // --- Merge ---
  // currentData only holds results for the current category,
  // so old titles are not shown while a new category is loading
  const titles = [
    ...(movies.currentData?.results ?? []),
    ...(series.currentData?.results ?? []),
  ].sort((a, b) => b.popularity - a.popularity);

  // --- Retry ---
  // A skipped query has never started and cannot be refetched
  const refetch = () => {
    if (!movies.isUninitialized) movies.refetch();
    if (!series.isUninitialized) series.refetch();
  };

  return {
    titles,
    isLoading: movies.isLoading || series.isLoading,
    isFetching: movies.isFetching || series.isFetching,
    error: movies.error ?? series.error,
    refetch,
  };
};

export default useExploreTitles;
