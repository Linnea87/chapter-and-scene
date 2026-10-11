// ===== Google Books mappers =====
// Google Books returns large, inconsistent objects. These mappers turn a result
// into the fields the UI needs.

// Cover and preview links are returned over http, which can be blocked on https pages
const toHttps = (url) => (url ? url.replace("http://", "https://") : null);

export const mapBook = (item) => {
  const { volumeInfo = {}, saleInfo = {}, accessInfo = {} } = item;

  // Only USD prices are used, since all prices in the shop are in USD
  const price = saleInfo.retailPrice;
  const hasPreview = accessInfo.viewability !== "NO_PAGES";

  return {
    id: item.id,
    title: volumeInfo.title ?? "Unknown title",
    authors: volumeInfo.authors ?? [],
    description: volumeInfo.description ?? "",
    pageCount: volumeInfo.pageCount ?? null,
    publishedYear: volumeInfo.publishedDate?.slice(0, 4) ?? null,
    coverUrl: toHttps(volumeInfo.imageLinks?.thumbnail),
    previewLink: toHttps(volumeInfo.previewLink),
    hasPreview,
    // Some publishers only allow the preview on Google's own site
    canEmbedPreview: hasPreview && accessInfo.embeddable === true,
    retailPrice: price?.currencyCode === "USD" ? price.amount : null,
  };
};

// Prefers the first result with a cover, since covers matter most in the shop
export const pickBestMatch = (items = []) => {
  const withCover = items.find(
    (item) => item.volumeInfo?.imageLinks?.thumbnail,
  );
  const bestMatch = withCover ?? items[0];

  return bestMatch ? mapBook(bestMatch) : null;
};
