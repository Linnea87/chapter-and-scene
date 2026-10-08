import {
  useDiscoverTitlesInfiniteQuery,
  useSearchAdaptationsQuery,
} from "../services/tmdb/tmdbApi";
import {
  CATEGORIES,
  MEDIA_TYPES,
  MIN_SEARCH_LENGTH,
} from "../features/explore/exploreConfig";
import {
  filterByMediaTypeAndCategory,
  mergePages,
} from "../features/explore/exploreHelpers";

// ===== useExploreTitles =====
// Fetches book adaptations for the selected media type and category,
// merges movies and series into one list and lets the user load more pages.
// Defaults to "All".

const useExploreTitles = ({
  category = CATEGORIES[0],
  mediaType = MEDIA_TYPES[0],
  searchTerm = "",
} = {}) => {
  // --- Search or discover ---
  const query = searchTerm.trim();
  const isSearching = query.length >= MIN_SEARCH_LENGTH;

  // --- Which requests to send ---
  // A media type is skipped if it is filtered out or has no matching genre.
  // Discover is skipped completely while searching.
  const includeMovies =
    !isSearching && mediaType.id !== "tv" && category.movieGenres !== null;
  const includeSeries =
    !isSearching && mediaType.id !== "movie" && category.tvGenres !== null;

  // --- Requests ---
  const movies = useDiscoverTitlesInfiniteQuery(
    { mediaType: "movie", genres: category.movieGenres },
    { skip: !includeMovies },
  );
  const series = useDiscoverTitlesInfiniteQuery(
    { mediaType: "tv", genres: category.tvGenres },
    { skip: !includeSeries },
  );
  const search = useSearchAdaptationsQuery(query, { skip: !isSearching });

  // --- Merge ---
  // currentData only holds pages for the current filters,
  // so old titles are not shown while new ones are loading
  const discoverTitles = mergePages(
    movies.currentData?.pages ?? [],
    series.currentData?.pages ?? [],
  );
  const searchTitles = filterByMediaTypeAndCategory(
    search.currentData ?? [],
    mediaType,
    category,
  );
  const titles = isSearching ? searchTitles : discoverTitles;

  // --- Load more ---
  // Only the media types that still have pages are fetched
  const hasMore = !isSearching && (movies.hasNextPage || series.hasNextPage);

  const loadMore = () => {
    if (movies.hasNextPage) movies.fetchNextPage();
    if (series.hasNextPage) series.fetchNextPage();
  };

  // --- Loading states ---
  // isFetching is also true while loading more, so that case is excluded
  // here to keep the loaded titles on screen
  const isFetchingMore = movies.isFetchingNextPage || series.isFetchingNextPage;
  const isFetchingDiscover =
    (movies.isFetching || series.isFetching) && !isFetchingMore;
  const isFetching = isSearching ? search.isFetching : isFetchingDiscover;

  // --- Retry ---
  // A skipped query has never started and cannot be refetched
  const refetch = () => {
    if (isSearching) {
      search.refetch();
      return;
    }

    if (!movies.isUninitialized) movies.refetch();
    if (!series.isUninitialized) series.refetch();
  };

  return {
    titles,
    isLoading: isSearching
      ? search.isLoading
      : movies.isLoading || series.isLoading,
    isFetching,
    isFetchingMore,
    hasMore,
    loadMore,
    error: isSearching ? search.error : (movies.error ?? series.error),
    refetch,
  };
};

export default useExploreTitles;
