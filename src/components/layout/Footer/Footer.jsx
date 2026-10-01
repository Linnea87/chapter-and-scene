import { Link } from "react-router";
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

      {/* TMDb and Google Books attribution is added in CS-041 */}

      <p className={styles.smallText}>
        © {currentYear} Chapter & Scene · A fictional shop built as a school
        project
      </p>
    </footer>
  );
};

export default Footer;
