import { useSearchParams } from "react-router";

// ===== Tab param hook =====
// Keeps the selected tab in the URL, e.g. ?tab=read, so it is kept on reload.
// The default tab has no param, e.g. /movie/123 shows Watch.
// An unknown tab in the URL is handled by Tabs, which then shows the first tab.
// defaultId: the id of the tab shown when the URL has none, e.g. "watch"

const useTabParam = (defaultId) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("tab") ?? defaultId;

  // replace: switching tabs does not add a step to the browser history,
  // so the back button still goes back to the previous page
  const selectTab = (id) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (id === defaultId) {
          next.delete("tab");
        } else {
          next.set("tab", id);
        }

        return next;
      },
      { replace: true },
    );
  };

  return [selectedId, selectTab];
};

export default useTabParam;
