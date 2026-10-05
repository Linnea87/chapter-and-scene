import getImageUrl from "../../../services/tmdb/getImageUrl";
import styles from "./DetailHero.module.css";

// ===== Detail hero =====
// Top of a detail page: backdrop, poster, title, facts, genres and overview.
// Shared by movies and series. The page decides which facts to show in meta.

const DetailHero = ({ details, meta }) => {
  const backdropUrl = getImageUrl(details.backdropPath, "w1280");
  const posterUrl = getImageUrl(details.posterPath, "w342");

  return (
    <header className={styles.hero}>
      {/* Decorative, so the alt text is empty */}
      {backdropUrl && (
        <img src={backdropUrl} alt="" className={styles.backdrop} />
      )}

      <div className={styles.content}>
        {posterUrl ? (
          <img src={posterUrl} alt="" className={styles.poster} />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            No image
          </div>
        )}

        {/* --- Title and facts --- */}
        <div>
          <h1 classname={styles.title}>{details.title}</h1>

          <ul className={styles.meta}>
            {meta.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>

          {details.genres.length > 0 && (
            <ul className={styles.genres} aria-label="Genres">
              {details.genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          )}
        </div>

        {details.overview && (
          <p classname={styles.overview}>{details.overview}</p>
        )}
      </div>
    </header>
  );
};

export default DetailHero;