// ===== Explore page =====
// Shows movies and series based on books, filtered by category.
// /movies and /series show one media type, /explore shows both, e.g. search results.
// The category lives in the URL, e.g. ?category=romance.
// The search term (?q=) comes from the search bar in the header.

import { useSearchParams } from "react-router";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import useExploreTitles from "../../hooks/useExploreTitles";
import {
  ALL_ID,
  CATEGORIES,
  MEDIA_TYPES,
  getOptionById,
} from "../../features/explore/exploreConfig";
import TitleResults from "../../components/titles/TitleResults/TitleResults";
import StatusMessage from "../../components/ui/feedback/StatusMessage/StatusMessage";
import FilterChips from "../../components/ui/forms/FilterChips/FilterChips";
import styles from "./ExplorePage.module.css";

const ExplorePage = ({ mediaTypeId = ALL_ID }) => {
  // --- Media type from the route, filters from the URL ---
  const [searchParams, setSearchParams] = useSearchParams();
  const mediaType = getOptionById(MEDIA_TYPES, mediaTypeId);
  const isAllTypes = mediaType.id === ALL_ID;
  const category = getOptionById(CATEGORIES, searchParams.get("category"));
  const searchTerm = searchParams.get("q") ?? "";

  // Updates one param and keeps the others.
  // Empty values and "All" remove the param.
  const updateFilter = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (!value || value === ALL_ID) {
        next.delete(key);
      } else {
        next.set(key, value);
      }

      return next;
    });
  };

  // --- Data ---
  // The search waits until the user stops typing
  const debouncedSearchTerm = useDebouncedValue(searchTerm);

  const results = useExploreTitles({
    category,
    mediaType,
    searchTerm: debouncedSearchTerm,
  });

  // --- Empty state ---
  // Uses the debounced term so the message matches the shown results
  const hasSearch = debouncedSearchTerm.trim() !== "";
  const emptyTitle = hasSearch
    ? `We couldn't find a book adaptation called "${debouncedSearchTerm.trim()}"`
    : "No titles match your filters";

  // Removes search and category in one step
  const clearAll = () => setSearchParams({});

  return (
    <section className="container">
      {/* "Movies" or "Series". On /explore, the search results page,
          the heading is only for screen readers */}
      <h1
        className={
          isAllTypes ? "visually-hidden" : `page-title ${styles.title}`
        }
      >
        {isAllTypes ? "Explore stories" : mediaType.label}
      </h1>

      {/* --- Filters --- */}
      <div className={styles.filters}>
        <FilterChips
          label="Filter by category"
          options={CATEGORIES}
          activeId={category.id}
          onChange={(id) => updateFilter("category", id)}
        />
      </div>

      {/* --- Results --- */}
      <TitleResults
        results={results}
        empty={
          <StatusMessage
            title={emptyTitle}
            message="Try another search or clear your filters to see all titles."
            actionLabel="Clear search and filters"
            onAction={clearAll}
          />
        }
      />
    </section>
  );
};

export default ExplorePage;
