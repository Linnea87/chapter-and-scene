import { useDiscoverTitlesQuery } from "../services/tmdb/tmdbApi";

// ===== useExploreTitles =====
// Fetches book adaptations for both films and series and merges them into one list

const useExploreTitles = () => {
  const movies = useDiscoverTitlesQuery({ mediaType: "movie" });
  const series = useDiscoverTitlesQuery({ mediaType: "tv" });

  // Most popular titles first, regardless of type
  const titles = [
    ...(movies.data?.results ?? []),
    ...(series.data?.results ?? []),
  ].sort((a, b) => b.popularity - a.popularity);

  return {
    titles,
    isLoading: movies.isLoading || series.isLoading,
    error: movies.error || series.error,
  };
};

export default useExploreTitles;
