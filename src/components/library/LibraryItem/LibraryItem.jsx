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
// Expired rentals get a "Buy or rent again" link instead of a title link.
// item: a row from getLibraryItems, see toLibraryItem

const LibraryItem = ({ item }) => {
  const isExpired = isRentalExpired(item);
  const detailPath = `/${item.mediaType}/${item.id}`;
  const hasTitleLink = item.mediaType !== "book" && !isExpired;
  const label = getLibraryLabel(item);

  return (
    <li className={styles.item}>
      <Thumbnail src={item.imageUrl} className={styles.image} />

      {/* --- Title, label and buy or rent again --- */}
      <div className={styles.info}>
        <h3 className={styles.title}>
          {hasTitleLink ? (
            <Link to={detailPath}>{item.title}</Link>
          ) : (
            item.title
          )}
        </h3>
        {label && <p className={styles.format}>{label}</p>}

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
