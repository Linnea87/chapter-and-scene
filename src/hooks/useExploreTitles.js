import { useDiscoverTitlesQuery } from "../services/tmdb/tmdbApi";
import { CATEGORIES } from "../features/explore/exploreConfig";

// ===== useExploreTitles =====
// Fetches book adaptations for both movies and series in the selected category
// and merges them into one list. Defaults to "All".

const useExploreTitles = (category = CATEGORIES[0]) => {
  // --- Requests ---
  // skip: no request is sent when the category has no matching genre
  const movies = useDiscoverTitlesQuery(
    { mediaType: "movie", genres: category.movieGenres },
    { skip: category.movieGenres === null },
  );
  const series = useDiscoverTitlesQuery(
    { mediaType: "tv", genres: category.tvGenres },
    { skip: category.tvGenres === null },
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
