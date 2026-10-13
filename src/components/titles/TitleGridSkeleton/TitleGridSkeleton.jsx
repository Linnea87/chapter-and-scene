// ===== Title grid skeleton =====
// Shares the grid styles with TitleGrid, so the skeleton has exactly the same layout

import TitleCardSkeleton from "../TitleCardSkeleton/TitleCardSkeleton";
import gridStyles from "../TitleGrid/TitleGrid.module.css";

// Enough cards to fill the first screen on desktop (two rows of six)
const SKELETON_COUNT = 12;

const TitleGridSkeleton = ({ label = "Loading titles..." }) => {
  return (
    <div role="status">
      <span className="visually-hidden">{label}</span>
      <ul className={gridStyles.grid}>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <li key={index}>
            <TitleCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TitleGridSkeleton;
