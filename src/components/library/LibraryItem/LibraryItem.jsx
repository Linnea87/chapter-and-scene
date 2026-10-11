import { Link } from "react-router";
import {
  getLibraryLabel,
  isRentalExpired,
} from "../../../features/library/libraryHelpers";
import PlayButton from "../PlayButton/PlayButton";
import Thumbnail from "../../ui/media/Thumbnail/Thumbnail";
import styles from "./LibraryItem.module.css";

// ===== Library item =====
// One row in My library: image, title and a label when needed, e.g. "Rented" or "Season 2".
// Movies and series that can be watched get a title link and a Play button.
// Expired rentals get a "Buy or rent again" link instead. Books have no page of their own.
// item: a row from getLibraryItems, see toLibraryItem

const LibraryItem = ({ item }) => {
  const isExpired = isRentalExpired(item);
  const isWatchable = item.mediaType !== "book" && !isExpired;
  const detailPath = `/${item.mediaType}/${item.id}`;
  const label = getLibraryLabel(item);

  return (
    <li className={styles.item}>
      <Thumbnail src={item.imageUrl} className={styles.image} />

      {/* --- Title, label and actions --- */}
      <div className={styles.info}>
        <h3 className={styles.title}>
          {isWatchable ? <Link to={detailPath}>{item.title}</Link> : item.title}
        </h3>
        {label && <p className={styles.format}>{label}</p>}

        {isWatchable && (
          <div className={styles.play}>
            <PlayButton item={item} />
          </div>
        )}

        {isExpired && (
          <Link to={detailPath} className={styles.again}>
            Buy or rent again
            <span className="visually-hidden"> {item.title}</span>
          </Link>
        )}
      </div>
    </li>
  );
};

export default LibraryItem;
