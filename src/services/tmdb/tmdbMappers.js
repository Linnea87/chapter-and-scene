import {
  AUTHOR_JOBS,
  CAST_LIMIT,
  CERTIFICATION_COUNTRIES,
  CERTIFICATION_LABELS,
} from "./tmdbConfig";

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
    releaseDate: date ?? null,
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

// The author is listed in the crew, e.g. with the job "Novel"
export const findAuthor = (credits) =>
  credits?.crew?.find((person) => AUTHOR_JOBS.includes(person.job))?.name ??
  null;

// Picks a YouTube trailer and returns its video key, e.g. "dQw4w9WgXcQ".
// Official trailers come first, then any trailer, then a teaser.
export const findTrailerKey = (videos) => {
  const youtubeVideos = (videos?.results ?? []).filter(
    (video) => video.site === "YouTube",
  );

  const trailer =
    youtubeVideos.find((video) => video.type === "Trailer" && video.official) ??
    youtubeVideos.find((video) => video.type === "Trailer") ??
    youtubeVideos.find((video) => video.type === "Teaser");

  return trailer?.key ?? null;
};

// Finds the age rating for one country, or null.
// Movies have one rating per release, series one rating per country.
const getCertification = (item, mediaType, country) => {
  if (mediaType === "movie") {
    const releases = item.release_dates?.results?.find(
      (result) => result.iso_3166_1 === country,
    );
    return (
      releases?.release_dates?.find((release) => release.certification)
        ?.certification ?? null
    );
  }

  return (
    item.content_ratings?.results?.find(
      (result) => result.iso_3166_1 === country,
    )?.rating || null
  );
};

// Returns the first age rating found, e.g. "13+", "All ages" or "15+"
export const findCertification = (item, mediaType) => {
  const certification = CERTIFICATION_COUNTRIES.map((country) =>
    getCertification(item, mediaType, country),
  ).find(Boolean);

  if (!certification) return null;
  if (/^\d+$/.test(certification)) return `${certification}+`;

  return CERTIFICATION_LABELS[certification] ?? certification;
};

// Builds on mapTitle and adds the fields only the detail page needs
export const mapTitleDetails = (item, mediaType) => ({
  ...mapTitle(item, mediaType),
  overview: item.overview ?? "",
  genres: (item.genres ?? []).map((genre) => genre.name),
  runtime: item.runtime ?? null,
  seasons: mapSeasons(item.seasons),
  author: findAuthor(item.credits),
  trailerKey: findTrailerKey(item.videos),
  certification: findCertification(item, mediaType),
  cast: mapCast(item.credits),
});
