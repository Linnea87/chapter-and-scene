import useExploreTitles from "../../hooks/useExploreTitles";
import TitleGrid from "../../components/titles/TitleGrid/TitleGrid";
import styles from "./ExplorePage.module.css";
import TitleGridSkeleton from "../../components/titles/TitleGridSkeleton/TitleGridSkeleton";

// ===== Explore page =====
// Shows movies and series based on books. Loading and error states are improved in CS-004 and CS-005.

const ExplorePage = () => {
  const { titles, isLoading, error } = useExploreTitles();

  return (
    <section className={styles.page}>
      <h1>Find the story. Choose the format</h1>
      <p className={styles.intro}>
        Explor movies and series adapted from books, then discover the original
        story.
      </p>

      {isLoading && <TitleGridSkeleton />}
      {error && <p>Something went wrong while loading titles.</p>}
      {!isLoading && !error && <TitleGrid titles={titles} />}
    </section>
  );
};

export default ExplorePage;
