import useHomeTitles from "../../../hooks/useHomeTitles";
import { ROW_LIMIT } from "../../../features/home/homeConfig";
import LoadError from "../../feedback/LoadError/LoadError";
import TitleRow from "../../titles/TitleRow/TitleRow";

// ===== Home row =====
// Fetches the titles for one row in HOME_ROWS and shows them in a TitleRow.
// row: { title, hint, sort, link }

const HomeRow = ({ row }) => {
  const { titles, isLoading, error, refetch } = useHomeTitles({
    sort: row.sort,
    limit: ROW_LIMIT,
  });

  if (error) {
    return (
      <LoadError title={`We couldn't load "${row.title}"`} onRetry={refetch} />
    );
  }

  // Nothing to show, e.g. no titles match
  if (!isLoading && titles.length === 0) return null;

  return (
    <TitleRow
      title={row.title}
      hint={row.hint}
      link={row.link}
      titles={titles}
      isLoading={isLoading}
    />
  );
};

export default HomeRow;
