// ===== Movie series =====
// The other movies in the same movie series, oldest first, e.g. every
// Harry Potter movie except the one the user is looking at.
// Each movie links to its detail page.
// collection: { id, name } from the movie details, movieId: the current movie

import { useGetCollectionQuery } from "../../../services/tmdb/tmdbApi";
import LoadError from "../../ui/feedback/LoadError/LoadError";
import TitleGrid from "../../titles/TitleGrid/TitleGrid";
import TitleGridSkeleton from "../../titles/TitleGridSkeleton/TitleGridSkeleton";
import styles from "./MovieSeries.module.css";

const MovieSeries = ({ collection, movieId }) => {
  const {
    currentData: movies,
    isFetching,
    error,
    refetch,
  } = useGetCollectionQuery(collection.id);

  // The movie the user is on is already shown above
  const otherMovies = (movies ?? []).filter((movie) => movie.id !== movieId);

  return (
    <section>
      {isFetching && <TitleGridSkeleton label="Loading the movie series" />}

      {!isFetching && error && (
        <LoadError
          title="We couldn't load the movie series"
          onRetry={refetch}
        />
      )}

      {!isFetching && !error && otherMovies.length === 0 && (
        <p className={styles.empty}>
          There are no other movies in this series yet.
        </p>
      )}

      {!isFetching && !error && otherMovies.length > 0 && (
        <TitleGrid titles={otherMovies} />
      )}
    </section>
  );
};

export default MovieSeries;
