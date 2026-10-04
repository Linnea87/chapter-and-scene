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
import SearchField from "../../components/common/SearchField/SearchField";
import { filterTitlesBySearch } from "../../features/explore/exploreHelpers";
import StatusMessage from "../../components/common/StatusMessage/StatusMessage";
import styles from "./ExplorePage.module.css";

// ===== Explore page =====
// Shows movies and series based on books, filtered by media type and category.
// The filters live in the URL, e.g. ?type=movie&category=romance

const ExplorePage = () => {
  // --- Filters from URL ---
  const [searchParams, setSearchParams] = useSearchParams();
  const mediaType = getOptionById(MEDIA_TYPES, searchParams.get("type"));
  const category = getOptionById(CATEGORIES, searchParams.get("category"));
  const searchTerm = searchParams.get("q") ?? "";

  // Updates one param and keeps the others.
  // Empty values and "All" remove the param.
  const updateFilter = (key, value, options) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (!value || value === ALL_ID) {
        next.delete(key);
      } else {
        next.set(key, value);
      }

      return next;
    }, options);
  };

  // --- Data ---
  const { titles, isFetching, error, refetch } = useExploreTitles({
    category,
    mediaType,
  });

  const visibleTitles = filterTitlesBySearch(titles, searchTerm);

  // --- Result states ---
  const showResults = !isFetching && !error;
  const isEmpty = showResults && visibleTitles.length === 0;

  // --- Empty state ---
  const hasSearch = searchTerm.trim() !== "";
  const emptyTitle = hasSearch
    ? `No titles match "${searchTerm.trim()}"`
    : "No titles match your filters";

  // Removes search, type and category in one step
  const clearAll = () => setSearchParams({});

  return (
    <section className={styles.page}>
      <h1>Find the story. Choose the format</h1>
      <p className={styles.intro}>
        Explore movies and series adapted from books, then discover the original
        story.
      </p>

      {/* --- Filters --- */}
      <div className={styles.filters}>
        <SearchField
          label="Search titles"
          placeholder="Search titles"
          value={searchTerm}
          onChange={(value) => updateFilter("q", value, { replace: true })}
        />
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
        <StatusMessage
          role="alert"
          title="We couldn't load the titles"
          message="Check your connection and try again."
          actionLabel="Try again"
          onAction={refetch}
        />
      )}

      {isEmpty && (
        <StatusMessage
          title={emptyTitle}
          message="Try another search or clear your filters to see all titles."
          actionLabel="Clear search and filters"
          onAction={clearAll}
        />
      )}

      {showResults && !isEmpty && <TitleGrid titles={visibleTitles} />}
    </section>
  );
};

export default ExplorePage;
