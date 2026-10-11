import { BookOpen, ExternalLink } from "lucide-react";
import useDisclosure from "../../../hooks/useDisclosure";
import { useGetBookQuery } from "../../../services/googleBooks/googleBooksApi";
import getBookReaderUrl from "../../../services/googleBooks/getBookReaderUrl";
import {
  NO_PREVIEW_MESSAGE,
  READER_NOTICE,
} from "../../../features/library/libraryConfig";
import ReaderModal from "../../books/ReaderModal/ReaderModal";
import Button from "../../ui/buttons/Button/Button";
import styles from "./ReadButton.module.css";

// ===== Read button =====
// Opens an e-book from My library. The Google Books preview stands in for the full book:
// - the preview can be embedded: it opens in the reader inside the app
// - the preview is only allowed on Google's site: it opens in Google's reader in a new tab
// - there is no preview: a message is shown instead
// Renders nothing while the book is loading.
// item: a library item with mediaType "book"

const ReadButton = ({ item }) => {
  const { isOpen, open, close } = useDisclosure();
  const { currentData: book, isFetching } = useGetBookQuery(item.id);

  if (isFetching) return null;

  // --- No preview, or Google Books could not be reached ---
  if (!book?.hasPreview) {
    return <p className={styles.message}>{NO_PREVIEW_MESSAGE}</p>;
  }

  // --- Read in Google's reader, in a new tab ---
  if (!book.canEmbedPreview) {
    return (
      <a
        href={getBookReaderUrl(item.id)}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
      >
        <BookOpen size={16} aria-hidden="true" />
        Read
        <span className="visually-hidden">
          {" "}
          {item.title} on Google Books (opens in a new tab)
        </span>
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    );
  }

  // --- Read in the app ---
  return (
    <>
      <Button variant="secondary" size="small" onClick={open}>
        <span className={styles.content}>
          <BookOpen size={16} aria-hidden="true" />
          Read
          <span className="visually-hidden"> {item.title}</span>
        </span>
      </Button>

      <ReaderModal
        bookId={item.id}
        title={item.title}
        isOpen={isOpen}
        onClose={close}
        notice={READER_NOTICE}
      />
    </>
  );
};

export default ReadButton;
