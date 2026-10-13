// ===== Title results =====
// The result area of a page that lists titles: skeleton while loading, an error
// with Try again, an optional empty message, the grid and a Load more button.
// Shared by the explore and browse pages.
// results: what useExploreTitles returns
// empty: shown instead of the grid when there are no titles, e.g. a StatusMessage

import Button from "../../ui/buttons/Button/Button";
import LoadError from "../../ui/feedback/LoadError/LoadError";
import TitleGrid from "../TitleGrid/TitleGrid";
import TitleGridSkeleton from "../TitleGridSkeleton/TitleGridSkeleton";
import styles from "./TitleResults.module.css";

const TitleResults = ({ results, empty = null }) => {
  const {
    titles,
    isFetching,
    isFetchingMore,
    hasMore,
    loadMore,
    error,
    refetch,
  } = results;

  // isFetching covers the first load, filter changes and retries
  if (isFetching) return <TitleGridSkeleton />;

  if (error) {
    return <LoadError title="We couldn't load the titles" onRetry={refetch} />;
  }

  if (titles.length === 0) return empty;

  return (
    <>
      <TitleGrid titles={titles} />

      {/* --- Load more --- */}
      {hasMore && (
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
    </>
  );
};

export default TitleResults;
