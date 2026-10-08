import { Link } from "react-router";
import tmdbLogo from "../../../assets/tmdb-logo.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Text logo until the real logo is designed */}
      <p className={styles.logo}>Chapter & Scene</p>
      <p className={styles.tagline}>Find the story. Choose the format.</p>

      <nav aria-label="Footer navigation">
        <ul className={styles.linkList}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/explore" className={styles.navLink}>
              Explore
            </Link>
          </li>
          <li>
            <Link to="/cart" className={styles.navLink}>
              Cart
            </Link>
          </li>
        </ul>
      </nav>

      {/* ===== Attribution ===== */}
      {/* Required by the TMDB terms of use. The logo must be less prominent than the app logo. */}
      <div className={styles.attribution}>
        <div className={styles.tmdbRow}>
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className={styles.tmdbLink}
          >
            <img src={tmdbLogo} alt="TMDB" className={styles.tmdbLogo} />
          </a>
          <p className={styles.smallText}>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
        </div>

        <p className={styles.smallText}>
          Book data from{" "}
          <a
            href="https://books.google.com"
            target="_blank"
            rel="noreferrer"
            className={styles.textLink}
          >
            Google Books
          </a>
          .
        </p>
      </div>

      <p className={styles.smallText}>
        © {currentYear} Chapter & Scene · A fictional shop built as a school
        project
      </p>
    </footer>
  );
};

export default Footer;
