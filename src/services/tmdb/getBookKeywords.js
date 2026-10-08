import { BOOK_KEYWORD_IDS } from "./tmdbConfig";

// ===== getBookKeywords =====
// Builds the with_keywords value for discover.
// Without an extra keyword, a title needs at least one book keyword ("|" = OR).
// With one, the main book keyword and the extra keyword are both required
// ("," = AND), since TMDb cannot mix OR and AND in one request.

const getBookKeywords = (extraKeyword) =>
  extraKeyword
    ? `${BOOK_KEYWORD_IDS[0]},${extraKeyword}`
    : BOOK_KEYWORD_IDS.join("|");

export default getBookKeywords;
