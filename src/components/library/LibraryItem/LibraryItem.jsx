import { Link } from "react-router";
import {
  getLibraryLabel,
  isRentalExpired,
} from "../../../features/library/libraryHelpers";
import Thumbnail from "../../ui/media/Thumbnail/Thumbnail";
import styles from "./LibraryItem.module.css";

// ===== Library item =====
// One row in My library: image, title and a label when needed, e.g. "Rented" or "Season 2".
// Movies and series link to their detail page, books have no page of their own.
// Expired rentals are greyed out.
// item: a row from getLibraryItems, see toLibraryItem

const LibraryItem = ({ item }) => {
  const hasDetailPage = item.mediaType !== "book";
  const label = getLibraryLabel(item);
  const itemClass = isRentalExpired(item)
    ? `${styles.item} ${styles.expired}`
    : styles.item;

  return (
    <li className={itemClass}>
      <Thumbnail src={item.imageUrl} className={styles.image} />

      {/* --- Title and label --- */}
      <div className={styles.info}>
        <h3 className={styles.title}>
          {hasDetailPage ? (
            <Link to={`/${item.mediaType}/${item.id}`}>{item.title}</Link>
          ) : (
            item.title
          )}
        </h3>
        {label && <p className={styles.format}>{label}</p>}
      </div>
    </li>
  );
};

export default LibraryItem;
