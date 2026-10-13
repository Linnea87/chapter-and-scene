// ===== Age rating =====
// The age rating of a movie or series in a small box, e.g. "13+" or "All ages".
// Renders nothing when TMDb has no rating.
// rating: the certification from the TMDb details
// as: the element to render, "span" by default, "li" inside a list

import styles from "./AgeRating.module.css";

const AgeRating = ({ rating, as: Tag = "span" }) => {
  if (!rating) return null;

  return <Tag className={styles.rating}>{rating}</Tag>;
};

export default AgeRating;
