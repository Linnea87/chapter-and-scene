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
// "See all" opens the browse page with every title in the row's order,
// e.g. /browse/recent. The id is used in the address.

export const HOME_ROWS = [
  {
    id: "recent",
    title: "Recently added",
    hint: "The newest stories",
    sort: "recent",
    link: "/browse/recent",
  },

  {
    id: "popular",
    title: "Popular right now",
    hint: "What everyone is watching",
    sort: "popular",
    link: "/browse/popular",
  },
];

// Number of titles in each row
export const ROW_LIMIT = 12;
