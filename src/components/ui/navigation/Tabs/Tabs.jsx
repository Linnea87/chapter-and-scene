import { useId, useRef, useState } from "react";
import styles from "./Tabs.module.css";

// ===== Tabs =====
// Accessible tabs: only the selected tab's panel is shown.
// The first tab is selected by default. Arrow keys move between tabs,
// Home and End go to the first and last tab, and only the selected tab
// can be reached with the Tab key.
// label: describes the tabs for screen readers, e.g. "Watch or read"
// tabs: [{ id, label, panel }], panel is the content shown for that tab

const Tabs = ({ label, tabs }) => {
  const [selectedId, setSelectedId] = useState(tabs[0].id);
  const baseId = useId();
  const tabRefs = useRef([]);

  // --- Handlers ---
  // Selects a tab by its position and moves focus to it.
  // Wraps around, so right from the last tab goes to the first.
  const selectAt = (index) => {
    const nextIndex = (index + tabs.length) % tabs.length;
    setSelectedId(tabs[nextIndex].id);
    tabRefs.current[nextIndex].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight") selectAt(index + 1);
    else if (e.key === "ArrowLeft") selectAt(index - 1);
    else if (e.key === "Home") selectAt(0);
    else if (e.key === "End") selectAt(tabs.length - 1);
    else return;

    // The keys above should not also scroll the page
    e.preventDefault();
  };

  // --- Render ---
  return (
    <div>
      <div role="tablist" aria-label={label} className={styles.list}>
        {tabs.map((tab, index) => {
          const isSelected = tab.id === selectedId;

          return (
            <button
              key={tab.id}
              ref={(element) => (tabRefs.current[index] = element)}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-controls={`${baseId}-panel-${tab.id}`}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              className={
                isSelected ? `${styles.tab} ${styles.selected}` : styles.tab
              }
              onClick={() => setSelectedId(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* --- Panels --- */}
      {/* All panels stay in the page, the others are hidden */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== selectedId}
          className={styles.panel}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
