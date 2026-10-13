// ===== Get book reader URL =====
// Builds the address of a book in Google's reader, opened on the preview.
// gbpv=1 opens the preview straight away, printsec=frontcover starts on the cover.

import { GOOGLE_BOOKS_READER_URL } from "./googleBooksConfig";

const getBookReaderUrl = (bookId) =>
  `${GOOGLE_BOOKS_READER_URL}${bookId}?gbpv=1&printsec=frontcover`;

export default getBookReaderUrl;
