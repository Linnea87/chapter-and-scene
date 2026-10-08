import { LANGUAGE, SEARCH_CANDIDATE_LIMIT } from "./tmdbConfig";
import { hasBookKeyword, mapKeywordIds, mapTitleList } from "./tmdbMappers";

// ===== getAdaptations =====
// Query function for the adaptation search endpoint.
// TMDb search cannot filter on keywords, so every candidate gets its own
// keywords request. Only titles with a book keyword are returned.

// Takes the first search results of one media type, as candidates for the keyword check
const getCandidates = (search, mediaType) =>
  mapTitleList(search.data, mediaType).results.slice(0, SEARCH_CANDIDATE_LIMIT);

const getAdaptations = async (searchTerm, api, extraOptions, fetchWithBQ) => {
  const params = { query: searchTerm, language: LANGUAGE };

  const [movieSearch, seriesSearch] = await Promise.all([
    fetchWithBQ({ url: "search/movie", params }),
    fetchWithBQ({ url: "search/tv", params }),
  ]);

  const searchError = movieSearch.error ?? seriesSearch.error;
  if (searchError) return { error: searchError };

  const candidates = [
    ...getCandidates(movieSearch, "movie"),
    ...getCandidates(seriesSearch, "tv"),
  ];

  const keywordChecks = await Promise.all(
    candidates.map((title) =>
      fetchWithBQ(`${title.mediaType}/${title.id}/keywords`),
    ),
  );

  const titles = candidates
    .filter(
      (title, index) =>
        keywordChecks[index].data &&
        hasBookKeyword(mapKeywordIds(keywordChecks[index].data)),
    )
    .sort((a, b) => b.popularity - a.popularity);

  return { data: titles };
};

export default getAdaptations;
