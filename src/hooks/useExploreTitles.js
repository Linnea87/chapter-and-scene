import { useDiscoverTitlesInfiniteQuery } from "../services/tmdb/tmdbApi";
import { CATEGORIES, MEDIA_TYPES } from "../features/explore/exploreConfig";
import { mergePages } from "../features/explore/exploreHelpers";

// ===== useExploreTitles =====
// Fetches book adaptations for the selected media type and category,
// merges movies and series into one list and lets the user load more pages.
// Defaults to "All".

const useExploreTitles = ({
  category = CATEGORIES[0],
  mediaType = MEDIA_TYPES[0],
} = {}) => {
  // --- Which requests to send ---
  // A media type is skipped if it is filtered out or has no matching genre
  const includeMovies = mediaType.id !== "tv" && category.movieGenres !== null;
  const includeSeries = mediaType.id !== "movie" && category.tvGenres !== null;

  // --- Requests ---
  const movies = useDiscoverTitlesInfiniteQuery(
    { mediaType: "movie", genres: category.movieGenres },
    { skip: !includeMovies },
  );
  const series = useDiscoverTitlesInfiniteQuery(
    { mediaType: "tv", genres: category.tvGenres },
    { skip: !includeSeries },
  );

  // --- Merge ---
  // currentData only holds pages for the current filters,
  // so old titles are not shown while new ones are loading
  const titles = mergePages(
    movies.currentData?.pages ?? [],
    series.currentData?.pages ?? [],
  );

  // --- Load more ---
  // Only the media types that still have pages are fetched
  const hasMore = movies.hasNextPage || series.hasNextPage;

  const loadMore = () => {
    if (movies.hasNextPage) movies.fetchNextPage();
    if (series.hasNextPage) series.fetchNextPage();
  };

  // --- Loading states ---
  // isFetching is also true while loading more, so that case is excluded
  // here to keep the loaded titles on screen
  const isFetchingMore = movies.isFetchingNextPage || series.isFetchingNextPage;
  const isFetching =
    (movies.isFetching || series.isFetching) && !isFetchingMore;

  // --- Retry ---
  // A skipped query has never started and cannot be refetched
  const refetch = () => {
    if (!movies.isUninitialized) movies.refetch();
    if (!series.isUninitialized) series.refetch();
  };

  return {
    titles,
    isLoading: movies.isLoading || series.isLoading,
    isFetching,
    isFetchingMore,
    hasMore,
    loadMore,
    error: movies.error ?? series.error,
    refetch,
  };
};

export default useExploreTitles;
