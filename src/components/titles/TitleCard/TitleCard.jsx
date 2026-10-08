import { Link } from "react-router";
import getImageUrl from "../../../services/tmdb/getImageUrl";
import styles from "./TitleCard.module.css";

// Labels shown on the card for each media type
const MEDIA_LABELS = {
  movie: "Movie",
  tv: "Series",
};

// titleAs: heading level for the title, "h2" in the grid, "h3" inside a titled row
const TitleCard = ({ item, titleAs: Title = "h2" }) => {
  const posterUrl = getImageUrl(item.posterPath, "w342");

  return (
    <Link to={`/${item.mediaType}/${item.id}`} className={styles.card}>
      <div className={styles.posterWrapper}>
        {posterUrl ? (
          // Empty alt, since the title is already shown as text in the link
          <img
            src={posterUrl}
            alt=""
            className={styles.poster}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            No image
          </div>
        )}
      </div>

      <Title className={styles.title}>{item.title}</Title>

      <p className={styles.meta}>
        <span className={styles.type}>{MEDIA_LABELS[item.mediaType]}</span>
        {item.year && <span>{item.year}</span>}
      </p>
    </Link>
  );
};

export default TitleCard;
