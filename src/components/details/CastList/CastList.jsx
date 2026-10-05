import getImageUrl from "../../../services/tmdb/getImageUrl";
import styles from "./CastList.module.css";

// ===== Cast list =====
// Main cast with photo, name and character. Hidden when there is no cast.

const CastList = ({ cast }) => {
  if (cast.length === 0) return null;

  return (
    <section>
      <h2>Cast</h2>

      <ul className={styles.list}>
        {cast.map((person) => {
          const photoUrl = getImageUrl(person.profilePath, "w185");

          return (
            <li key={person.id} className={styles.person}>
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt=""
                  className={styles.photo}
                  loading="lazy"
                />
              ) : (
                <div className={styles.photo} aria-hidden="true" />
              )}

              <p className={styles.name}>{person.name}</p>
              {person.character && (
                <p className={styles.character}>{person.character}</p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CastList;
