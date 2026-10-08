import { useSearchParams } from "react-router";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import useExploreTitles from "../../hooks/useExploreTitles";
import {
  ALL_ID,
  CATEGORIES,
  MEDIA_TYPES,
  getOptionById,
} from "../../features/explore/exploreConfig";
import { getAvailableCategories } from "../../features/explore/exploreHelpers";
import Button from "../../components/buttons/Button/Button";
import FilterChips from "../../components/forms/FilterChips/FilterChips";
import LoadError from "../../components/feedback/LoadError/LoadError";
import SearchField from "../../components/forms/SearchField/SearchField";
import StatusMessage from "../../components/feedback/StatusMessage/StatusMessage";
import TitleGrid from "../../components/titles/TitleGrid/TitleGrid";
import TitleGridSkeleton from "../../components/titles/TitleGridSkeleton/TitleGridSkeleton";
import styles from "./ExplorePage.module.css";

// ===== Explore page =====
// Shows movies and series based on books, filtered by media type and category.
// The filters live in the URL, e.g. ?type=movie&category=romance

const ExplorePage = () => {
  // --- Filters from URL ---
  const [searchParams, setSearchParams] = useSearchParams();
  const mediaType = getOptionById(MEDIA_TYPES, searchParams.get("type"));
  const availableCategories = getAvailableCategories(CATEGORIES, mediaType);
  const category = getOptionById(
    availableCategories,
    searchParams.get("category"),
  );
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
  // The search waits until the user stops typing
  const debouncedSearchTerm = useDebouncedValue(searchTerm);

  const {
    titles,
    isFetching,
    isFetchingMore,
    hasMore,
    loadMore,
    error,
    refetch,
  } = useExploreTitles({
    category,
    mediaType,
    searchTerm: debouncedSearchTerm,
  });

  // --- Result states ---
  const showResults = !isFetching && !error;
  const isEmpty = showResults && titles.length === 0;

  // --- Empty state ---
  // Uses the debounced term and the new text
  const hasSearch = debouncedSearchTerm.trim() !== "";
  const emptyTitle = hasSearch
    ? `We couldn't find a book adaptation called "${debouncedSearchTerm.trim()}"`
    : "No titles match your filters";

  // Removes search, type and category in one step
  const clearAll = () => setSearchParams({});

  return (
    <section className="container">
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
          options={availableCategories}
          activeId={category.id}
          onChange={(id) => updateFilter("category", id)}
        />
      </div>

      {/* isFetching covers the first load, filter changes and retries */}
      {isFetching && <TitleGridSkeleton />}

      {!isFetching && error && (
        <LoadError title="We couldn't load the titles" onRetry={refetch} />
      )}

      {isEmpty && (
        <StatusMessage
          title={emptyTitle}
          message="Try another search or clear your filters to see all titles."
          actionLabel="Clear search and filters"
          onAction={clearAll}
        />
      )}

      {showResults && !isEmpty && <TitleGrid titles={titles} />}

      {/* --- Load more --- */}
      {showResults && hasMore && (
        <div className={styles.loadMore}>
          <Button
            onClick={loadMore}
            disabled={isFetchingMore}
            aria-busy={isFetchingMore}
          >
            {isFetchingMore ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default ExplorePage;
