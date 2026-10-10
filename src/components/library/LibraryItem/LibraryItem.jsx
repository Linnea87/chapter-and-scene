import { Link } from "react-router";
import { getLibraryLabel } from "../../../features/library/libraryHelpers";
import Thumbnail from "../../ui/media/Thumbnail/Thumbnail";
import styles from "./LibraryItem.module.css";

// ===== Library item =====
// One row in My library: image, title and format, e.g. "Rental" or "Season 2".
// Movies and series link to their detail page, books have no page of their own.
// item: a row from getLibraryItems, see toLibraryItem

const LibraryItem = ({ item }) => {
  const hasDetailPage = item.mediaType !== "book";

  return (
    <li className={styles.item}>
      <Thumbnail src={item.imageUrl} className={styles.image} />

      {/* --- Title and format --- */}
      <div className={styles.info}>
        <h3 className={styles.title}>
          {hasDetailPage ? (
            <Link to={`/${item.mediaType}/${item.id}`}>{item.title}</Link>
          ) : (
            item.title
          )}
        </h3>
        <p className={styles.format}>{getLibraryLabel(item)}</p>
      </div>
    </li>
  );
};

export default LibraryItem;
