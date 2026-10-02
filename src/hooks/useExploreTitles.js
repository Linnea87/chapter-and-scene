import { useDiscoverTitlesQuery } from "../services/tmdb/tmdbApi";

// ===== useExploreTitles =====
// Fetches book adaptations for both movies and series and merges them into one list

const useExploreTitles = () => {
  const movies = useDiscoverTitlesQuery({ mediaType: "movie" });
  const series = useDiscoverTitlesQuery({ mediaType: "tv" });

  // Most popular titles first, regardless of type
  const titles = [
    ...(movies.data?.results ?? []),
    ...(series.data?.results ?? []),
  ].sort((a, b) => b.popularity - a.popularity);

  // Retries both requests, e.g. from a "Try again" button
  const refetch = () => {
    movies.refetch();
    series.refetch();
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
