import { useSearchParams } from "react-router";
import useExploreTitles from "../../hooks/useExploreTitles";
import {
  ALL_ID,
  CATEGORIES,
  MEDIA_TYPES,
  getOptionById,
} from "../../features/explore/exploreConfig";
import FilterChips from "../../components/common/FilterChips/FilterChips";
import TitleGrid from "../../components/titles/TitleGrid/TitleGrid";
import TitleGridSkeleton from "../../components/titles/TitleGridSkeleton/TitleGridSkeleton";
import ErrorMessage from "../../components/common/ErrorMessage/ErrorMessage";
import styles from "./ExplorePage.module.css";

// ===== Explore page =====
// Shows movies and series based on books, filtered by media type and category.
// The filters live in the URL, e.g. ?type=movie&category=romance

const ExplorePage = () => {
  // --- Filters from URL ---
  const [searchParams, setSearchParams] = useSearchParams();
  const mediaType = getOptionById(MEDIA_TYPES, searchParams.get("type"));
  const category = getOptionById(CATEGORIES, searchParams.get("category"));

  // Updates one param and keeps the others. "All" removes the param.
  const updateFilter = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value === ALL_ID) {
        next.delete(key);
      } else {
        next.set(key, value);
      }

      return next;
    });
  };

  // --- Data ---
  const { titles, isFetching, error, refetch } = useExploreTitles({
    category,
    mediaType,
});

  return (
    <section className={styles.page}>
      <h1>Find the story. Choose the format</h1>
      <p className={styles.intro}>
        Explore movies and series adapted from books, then discover the original
        story.
      </p>

      {/* --- Filters --- */}
      <div className={styles.filters}>
        <FilterChips
          label="Filter by type"
          options={MEDIA_TYPES}
          activeId={mediaType.id}
          onChange={(id) => updateFilter("type", id)}
        />
        <FilterChips
          label="Filter by category"
          options={CATEGORIES}
          activeId={category.id}
          onChange={(id) => updateFilter("category", id)}
        />
      </div>

      {/* isFetching covers the first load, filter changes and retries */}
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
