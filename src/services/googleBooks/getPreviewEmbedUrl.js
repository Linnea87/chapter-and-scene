import { GOOGLE_BOOKS_EMBED_URL } from "./googleBooksConfig";

// ===== Get preview embed URL =====
// Builds the address of a book preview that can be shown in an iframe.
// output=embed gives the version without Google's page around it,
// printsec=frontcover starts the preview on the cover.

const getPreviewEmbedUrl = (bookId) =>
  `${GOOGLE_BOOKS_EMBED_URL}?id=${bookId}&printsec=frontcover&output=embed`;

export default getPreviewEmbedUrl;
