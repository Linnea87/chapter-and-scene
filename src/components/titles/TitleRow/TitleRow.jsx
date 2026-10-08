import { useId } from "react";
import { Link } from "react-router";
import TitleCard from "../TitleCard/TitleCard";
import TitleCardSkeleton from "../TitleCardSkeleton/TitleCardSkeleton";
import styles from "./TitleRow.module.css";

// ===== Title row =====
// A titled row of title cards that scrolls sideways, with a "See all" link.
// The parent fetches the titles, this component only shows them.

// Number of placeholder cards while loading
const SKELETON_COUNT = 6;

const TitleRow = ({ title, hint, link, titles, isLoading }) => {
  const headingId = useId();

  return (
    <section className={styles.row} aria-labelledby={headingId}>
      {/* --- Heading and "See all" --- */}
      <div className={styles.header}>
        <div>
          <h2 id={headingId} className={styles.title}>
            {title}
          </h2>
          {hint && <p className={styles.hint}>{hint}</p>}
        </div>

        <Link to={link} className={styles.link}>
          See all
          <span className="visually-hidden"> {title}</span>
        </Link>
      </div>

      {/* --- Cards --- */}
      <ul className={styles.list}>
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <li key={index} className={styles.item}>
                <TitleCardSkeleton />
              </li>
            ))
          : titles.map((item) => (
              <li key={`${item.mediaType}-${item.id}`} className={styles.item}>
                <TitleCard item={item} titleAs="h3" />
              </li>
            ))}
      </ul>
    </section>
  );
};

export default TitleRow;
