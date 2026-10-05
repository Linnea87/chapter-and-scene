import { CAST_LIMIT } from "./tmdbConfig";

// ===== TMDb mappers =====
// Movies and series use different field names in TMDb. These map both to one shape,
// so components do not need to know the difference.

export const mapTitle = (item, mediaType) => {
  const isMovie = mediaType === "movie";
  const date = isMovie ? item.release_date : item.first_air_date;

  return {
    id: item.id,
    mediaType,
    title: isMovie ? item.title : item.name,
    year: date ? date.slice(0, 4) : null,
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

// Builds on mapTitle and adds the fields only the detail page needs
export const mapTitleDetails = (item, mediaType) => ({
  ...mapTitle(item, mediaType),
  overview: item.overview ?? "",
  genres: (item.genres ?? []).map((genre) => genre.name),
  tuntime: item.runtime ?? null,
  cast: mapCast(item.credits),
});
