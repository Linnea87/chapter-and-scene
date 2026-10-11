import { useParams } from "react-router";
import useExploreTitles from "../../hooks/useExploreTitles";
import { HOME_ROWS } from "../../features/home/homeConfig";
import Button from "../../components/ui/buttons/Button/Button";
import BackLink from "../../components/ui/navigation/BackLink/BackLink";
import LoadError from "../../components/ui/feedback/LoadError/LoadError";
import StatusMessage from "../../components/ui/feedback/StatusMessage/StatusMessage";
import TitleGrid from "../../components/titles/TitleGrid/TitleGrid";
import TitleGridSkeleton from "../../components/titles/TitleGridSkeleton/TitleGridSkeleton";
import styles from "./BrowsePage.module.css";

// ===== Browse page =====
// "See all" for a home row: every title in the row's order, e.g. /browse/recent.
// The row comes from HOME_ROWS, so a new row gets its page without changes here.

const BrowsePage = () => {
  const { rowId } = useParams();
  const row = HOME_ROWS.find((item) => item.id === rowId);

  // Hooks always run, so an unknown row is handled after them
  const {
    titles,
    isFetching,
    isFetchingMore,
    hasMore,
    loadMore,
    error,
    refetch,
  } = useExploreTitles({ sort: row?.sort });

  // --- Unknown row ---
  if (!row) {
    return (
      <div className="container">
        <StatusMessage
          titleAs="h1"
          title="This list doesn't exist"
          message="Go back to the home page to see what's new and popular."
          actionLabel="Back to home"
          actionTo="/"
        />
      </div>
    );
  }

  const showResults = !isFetching && !error;

  return (
    <section className="container">
      <BackLink to="/" className={styles.backLink}>
        Back to home
      </BackLink>

      <h1>{row.title}</h1>
      <p className={styles.intro}>{row.hint}</p>

      {/* isFetching covers the first load and retries */}
      {isFetching && <TitleGridSkeleton />}

      {!isFetching && error && (
        <LoadError title="We couldn't load the titles" onRetry={refetch} />
      )}

      {showResults && <TitleGrid titles={titles} />}

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

export default BrowsePage;
