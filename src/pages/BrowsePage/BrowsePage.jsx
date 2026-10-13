// ===== Browse page =====
// "See all" for a home row: every title in the row's order, e.g. /browse/recent.
// The row comes from HOME_ROWS, so a new row gets its page without changes here.
// No back link: the Home icon in the header and the browser's back button lead back.

import { useParams } from "react-router";
import useExploreTitles from "../../hooks/useExploreTitles";
import { HOME_ROWS } from "../../features/home/homeConfig";
import TitleResults from "../../components/titles/TitleResults/TitleResults";
import StatusMessage from "../../components/ui/feedback/StatusMessage/StatusMessage";
import styles from "./BrowsePage.module.css";

const BrowsePage = () => {
  const { rowId } = useParams();
  const row = HOME_ROWS.find((item) => item.id === rowId);

  // Hooks always run, so an unknown row is handled after them
  const results = useExploreTitles({ sort: row?.sort });

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

  return (
    <section className="container">
      <h1 className={styles.title}>{row.title}</h1>
      <p className={styles.intro}>{row.hint}</p>

      {/* --- Results --- */}
      <TitleResults results={results} />
    </section>
  );
};

export default BrowsePage;
