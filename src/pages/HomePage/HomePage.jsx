import { HOME_ROWS } from "../../features/home/homeConfig";
import HeroCarousel from "../../components/home/HeroCarousel/HeroCarousel";
import HomeRow from "../../components/home/HomeRow/HomeRow";
import styles from "./HomePage.module.css";

// ===== Home page =====
// Featured stories and themed rows of book adaptations (CS-045).
// The rows come from HOME_ROWS, so a row is added in the config, not here.

const HomePage = () => {
  return (
    <div className="container">
      {/* One h1 per page. The page has no visible heading, like streaming services */}
      <h1 className="visually-hidden">Discover stories</h1>

      <div className={styles.rows}>
        <HeroCarousel />

        {HOME_ROWS.map((row) => (
          <HomeRow key={row.id} row={row} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
