// ===== Home page configuration =====
// What the home page shows. All titles are book adaptations.
// sort is one of "popular", "topRated" or "recent", see getSortParams.

// --- Hero carousel ---
// The highest rated book adaptations

export const HERO = {
  sort: "topRated",
  limit: 5,
};

// --- Rows ---
// "See all" goes to Explore. Sorting in Explore is added in CS-009,
// so "Recently added" will link to a sorted list then.

export const HOME_ROWS = [
  {
    id: "popular",
    title: "Popular right now",
    hint: "What everyone is watching",
    sort: "popular",
    link: "/explore",
  },
  {
    id: "recent",
    title: "Recently added",
    hint: "The newest stories",
    sort: "recent",
    link: "/explore",
  },
];

// Number of titles in each row
export const ROW_LIMIT = 12;
