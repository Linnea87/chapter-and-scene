import { useDiscoverTitlesInfiniteQuery } from "../services/tmdb/tmdbApi";
import { mergeAndSortTitles } from "../features/home/homeHelpers";

// ===== useHomeTitles =====
// Fetches the first page of movies and series for one home section
// and returns them as one sorted list.
// sort: "popular", "topRated" or "recent"

const useHomeTitles = ({ sort, limit }) => {
  // --- Requests ---
  // An empty genres string means all genres, same as "All" on Explore
  const movies = useDiscoverTitlesInfiniteQuery({
    mediaType: "movie",
    genres: "",
    sort,
  });
  const series = useDiscoverTitlesInfiniteQuery({
    mediaType: "tv",
    genres: "",
    sort,
  });

  // --- Merge ---
  // Only the first page is needed, the row has no "Load more"
  const titles = mergeAndSortTitles(
    movies.currentData?.pages[0]?.results ?? [],
    series.currentData?.pages[0]?.results ?? [],
    sort,
    limit,
  );

  // --- Retry ---
  const refetch = () => {
    movies.refetch();
    series.refetch();
  };

  return {
    titles,
    isLoading: movies.isLoading || series.isLoading,
    error: movies.error ?? series.error,
    refetch,
  };
};

export default useHomeTitles;
