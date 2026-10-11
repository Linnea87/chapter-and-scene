import { LibraryBig } from "lucide-react";
import { useGetLibraryItemsQuery } from "../../services/supabase/supabaseApi";
import { groupBySection } from "../../features/library/libraryHelpers";
import LibraryItem from "../../components/library/LibraryItem/LibraryItem";
import LoadError from "../../components/ui/feedback/LoadError/LoadError";
import Loader from "../../components/ui/feedback/Loader/Loader";
import StatusMessage from "../../components/ui/feedback/StatusMessage/StatusMessage";
import styles from "./LibraryPage.module.css";

// ===== Library page =====
// Everything the user has bought or rented digitally, grouped into sections.
// Only reachable when signed in, see ProtectedRoute.

const LibraryPage = () => {
  const {
    data: items,
    isLoading,
    isError,
    refetch,
  } = useGetLibraryItemsQuery();

  // --- Loading and errors ---
  if (isLoading) return <Loader label="Loading your library" />;

  if (isError) {
    return (
      <div className="container">
        <LoadError title="Could not load your library" onRetry={refetch} />
      </div>
    );
  }

  // --- Empty library ---
  if (items.length === 0) {
    return (
      <div className="container">
        <StatusMessage
          icon={LibraryBig}
          titleAs="h1"
          title="Your library is empty"
          message="Movies, series and e-books you buy will show up here."
          actionLabel="Explore stories"
          actionTo="/explore"
        />
      </div>
    );
  }

  // --- Library ---
  return (
    <div className="container">
      <div className={styles.content}>
        <h1>My library</h1>

        {groupBySection(items).map((section) => (
          <section key={section.id} className={styles.section}>
            <h2>{section.title}</h2>

            <ul className={styles.list}>
              {section.items.map((item) => (
                <LibraryItem key={item.key} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
