import { useSearchParams } from "react-router";
import useExploreTitles from "../../hooks/useExploreTitles";
import {
  DEFAULT_CATEGORY_ID,
  getCategoryById,
} from "../../features/explore/exploreConfig";
import CategoryFilter from "../../components/explore/CategoryFilter/CategoryFilter";
import TitleGrid from "../../components/titles/TitleGrid/TitleGrid";
import TitleGridSkeleton from "../../components/titles/TitleGridSkeleton/TitleGridSkeleton";
import ErrorMessage from "../../components/common/ErrorMessage/ErrorMessage";
import styles from "./ExplorePage.module.css";

// ===== Explore page =====
// Shows movies and series based on books, filtered by category.
// The selected category lives in the URL (?category=romance).

const ExplorePage = () => {
  // --- Category from URL ---
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = getCategoryById(searchParams.get("category"));

  // Copies the current params so other filters (CS-006) are kept
  const handleCategoryChange = (categoryId) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (categoryId === DEFAULT_CATEGORY_ID) {
        next.delete("category");
      } else {
        next.set("category", categoryId);
      }

      return next;
    });
  };

  // --- Data ---
  const { titles, isFetching, error, refetch } =
    useExploreTitles(activeCategory);

  return (
    <section className={styles.page}>
      <h1>Find the story. Choose the format</h1>
      <p className={styles.intro}>
        Explore movies and series adapted from books, then discover the original
        story.
      </p>

      <CategoryFilter
        activeId={activeCategory.id}
        onChange={handleCategoryChange}
      />

      {/* isFetching covers the first load, category changes and retries */}
      {isFetching && <TitleGridSkeleton />}

      {!isFetching && error && (
        <ErrorMessage
          title="We couldn't load the titles"
          message="Check your connection and try again."
          onRetry={refetch}
        />
      )}

      {!isFetching && !error && <TitleGrid titles={titles} />}
    </section>
  );
};

export default ExplorePage;
