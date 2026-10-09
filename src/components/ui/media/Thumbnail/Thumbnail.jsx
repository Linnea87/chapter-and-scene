import styles from "./Thumbnail.module.css";

// ===== Thumbnail =====
// Shows an image, or a placeholder with the same size when there is none.
// The image is decorative (alt=""), since a title is always shown next to it.
// className lets the parent decide the size and shape.
// placeholder: optional text in the empty box, e.g. "No image"

const Thumbnail = ({ src, className, placeholder, ...props }) => {
  const thumbnailClass = [styles.thumbnail, className]
    .filter(Boolean)
    .join(" ");

  if (!src) {
    return (
      <div
        className={`${thumbnailClass} ${styles.placeholder}`}
        aria-hidden="true"
      >
        {placeholder}
      </div>
    );
  }

  return <img src={src} alt="" className={thumbnailClass} {...props} />;
};

export default Thumbnail;
