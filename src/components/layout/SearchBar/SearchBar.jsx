import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import SearchField from "../../ui/forms/SearchField/SearchField";

// ===== Search bar =====
// The search field that folds out under the header icons.
// Typing shows the results on the explore page, e.g. /explore?q=dune.
// On the explore page the chosen category is kept.

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isOnExplore = pathname === "/explore";

  // The current search on the explore page, empty on every other page
  const searchTerm = isOnExplore ? (searchParams.get("q") ?? "") : "";

  // The cursor is placed in the field as soon as the bar opens
  const fieldRef = useRef(null);

  useEffect(() => {
    fieldRef.current?.focus();
  }, []);

  // --- Handlers ---
  // Keeps the other filters on the explore page, starts fresh elsewhere.
  // replace: on the explore page each letter is not its own history step
  const handleChange = (value) => {
    const params = new URLSearchParams(isOnExplore ? searchParams : "");

    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    navigate(
      { pathname: "/explore", search: params.toString() },
      { replace: isOnExplore },
    );
  };

  return (
    <SearchField
      label="Search titles"
      placeholder="Search titles"
      value={searchTerm}
      onChange={handleChange}
      ref={fieldRef}
    />
  );
};

export default SearchBar;
