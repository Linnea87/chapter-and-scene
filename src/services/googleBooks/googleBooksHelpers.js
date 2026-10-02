// ===== Google Books helpers =====
// Google Books returns large, inconsistent objects. These helpers build the search
// query and map a result to the fields the UI needs.

// Searching by title and author gives far more accurate matches than title only
export const buildBookQuery = (title, author) =>
  author ? `intitle:${title} inauthor:${author}` : `intitle:${title}`;

// Cover and preview links are returned over http, which can be blocked on https pages
const toHttps = (url) => (url ? url.replace("http://", "https://") : null);

export const mapBook = (item) => {
  const { volumeInfo = {}, saleInfo = {} } = item;

  return {
    id: item.id,
    title: volumeInfo.title ?? "Unknown title",
    authors: volumeInfo.authors ?? [],
    description: volumeInfo.description ?? "",
    pageCount: volumeInfo.pageCount ?? null,
    publishedYear: volumeInfo.publishedDate?.slice(0, 4) ?? null,
    coverUrl: toHttps(volumeInfo.imageLinks?.thumbnail),
    previewLink: toHttps(volumeInfo.previewLink),
    hasPreview: accessInfo.viewability !== "NO_PAGES",
    retailPrice: saleInfo.retailPrice?.amount ?? null,
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
