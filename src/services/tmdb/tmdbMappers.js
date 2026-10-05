import { CAST_LIMIT } from "./tmdbConfig";

// ===== TMDb mappers =====
// Movies and series use different field names in TMDb. These map both to one shape,
// so components do not need to know the difference.

// --- Helpers ---
// Takes the year from a TMDb date, e.g. "2011-04-17" → "2011"
const getYear = (date) => (date ? date.slice(0, 4) : null);

// --- Titles ---
export const mapTitle = (item, mediaType) => {
  const isMovie = mediaType === "movie";
  const date = isMovie ? item.release_date : item.first_air_date;

  return {
    id: item.id,
    mediaType,
    title: isMovie ? item.title : item.name,
    year: getYear(date),
    posterPath: item.poster_path ?? null,
    backdropPath: item.backdrop_path ?? null,
    genreIds: item.genre_ids ?? [],
    popularity: item.popularity ?? null,
    rating: item.vote_average ?? null,
  };
};

// Keeps the page info needed for "Load more" together with the mapped results
export const mapTitleList = (response, mediaType) => ({
  page: response.page,
  totalPages: response.total_pages,
  results: response.results.map((item) => mapTitle(item, mediaType)),
});

// --- Details ---
// Only the main cast is shown, in the order TMDb ranks them
export const mapCast = (credits) =>
  (credits?.cast ?? []).slice(0, CAST_LIMIT).map((person) => ({
    id: person.id,
    name: person.name,
    character: person.character ?? "",
    profilePath: person.profile_path ?? null,
  }));

// Season 0 holds specials and extras, and seasons without episodes have not aired yet.
// Both are left out, since they cannot be bought.
export const mapSeasons = (seasons) =>
  (seasons ?? [])
    .filter((season) => season.season_number > 0 && season.episode_count > 0)
    .map((season) => ({
      id: season.id,
      number: season.season_number,
      name: season.name,
      episodeCount: season.episode_count,
      year: getYear(season.air_date),
    }));

// Builds on mapTitle and adds the fields only the detail page needs
export const mapTitleDetails = (item, mediaType) => ({
  ...mapTitle(item, mediaType),
  overview: item.overview ?? "",
  genres: (item.genres ?? []).map((genre) => genre.name),
  runtime: item.runtime ?? null,
  seasons: mapSeasons(item.seasons),
  cast: mapCast(item.credits),
});
