// ===== Footer =====
// The logo, the same main pages as the header, and the
// attribution that TMDB and Google Books require.

import { Link } from "react-router";
import logoFull from "../../../assets/logo-full.webp";
import tmdbLogo from "../../../assets/tmdb-logo.svg";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <img
        src={logoFull}
        alt="Chapter & Scene"
        width="400"
        height="393"
        className={styles.logo}
      />

      <nav aria-label="Footer navigation">
        <ul className={styles.linkList}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/movies" className={styles.navLink}>
              Movies
            </Link>
          </li>
          <li>
            <Link to="/series" className={styles.navLink}>
              Series
            </Link>
          </li>
          <li>
            <Link to="/cart" className={styles.navLink}>
              Cart
            </Link>
          </li>
        </ul>
      </nav>

      {/* --- Attribution --- */}
      {/* Required by the TMDB terms of use. The notice names TMDB,
          and the logo sits in the bottom row, less prominent than the app logo */}
      <div className={styles.attribution}>
        <p className={styles.smallText}>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>

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

      {/* --- Copyright on the left, TMDB logo on the right --- */}
      <div className={styles.bottomRow}>
        <p className={styles.smallText}>
          © {currentYear} Chapter & Scene · A school project
        </p>

        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noreferrer"
          className={styles.tmdbLink}
        >
          <img src={tmdbLogo} alt="TMDB" className={styles.tmdbLogo} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
