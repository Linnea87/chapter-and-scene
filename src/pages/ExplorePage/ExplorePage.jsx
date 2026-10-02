import useExploreTitles from "../../hooks/useExploreTitles";
import TitleGrid from "../../components/titles/TitleGrid/TitleGrid";
import styles from "./ExplorePage.module.css";
import TitleGridSkeleton from "../../components/titles/TitleGridSkeleton/TitleGridSkeleton";

// ===== Explore page =====
// Shows movies and series based on books. Loading and error states are improved in CS-004 and CS-005.

const ExplorePage = () => {
  const { titles, isLoading, isFetching, error, refetch } = useExploreTitles();

  // isLoading is only true on the first request, so a retry after an error
  // uses isFetching to show the skeleton again
  const showSkeleton = isLoading || (error && isFetching);

  return (
    <section className={styles.page}>
      <h1>Find the story. Choose the format</h1>
      <p className={styles.intro}>
        Explor movies and series adapted from books, then discover the original
        story.
      </p>

      {showSkeleton && <TitleGridSkeleton />}

      {!showSkeleton && error && (
        <ErrorMessage
          title="We couldn't load the titles"
          message="Check your connection and try again."
          onRetry={refetch}
        />
      )}

      {!showSkeleton && !error && <TitleGrid titles={titles} />}
    </section>
  );
};

export default ExplorePage;
