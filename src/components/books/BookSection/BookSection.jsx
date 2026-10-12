import { useFindBookQuery } from "../../../services/googleBooks/googleBooksApi";
import { getBookPrices } from "../../../features/pricing/pricingHelpers";
import { getDeliveryLabel } from "../../../features/cart/cartHelpers";
import { BOOK_FORMATS, FORMAT_LABELS } from "../../../features/cart/cartConfig";
import Loader from "../../ui/feedback/Loader/Loader";
import LoadError from "../../ui/feedback/LoadError/LoadError";
import PriceOptions from "../../pricing/PriceOptions/PriceOptions";
import styles from "./BookSection.module.css";

// ===== Book section =====
// Finds the book a movie or series is based on in Google Books,
// and shows it with prices for each book format.
// If Google Books cannot be reached, the user can try again without reloading.

const BookSection = ({ title, author, mediaType }) => {
  // The search is skipped until there is a title to search for
  const {
    currentData: book,
    isFetching,
    error,
    refetch,
  } = useFindBookQuery({ title, author }, { skip: !title });

  const storyType = mediaType === "movie" ? "movie" : "series";

  // --- Book card content ---
  const bookAuthor = book?.authors[0] ?? author;
  const facts = [
    book?.pageCount ? `${book.pageCount} pages` : null,
    book?.publishedYear,
  ].filter(Boolean);

  // --- Prices ---
  const prices = getBookPrices(book);
  const options = BOOK_FORMATS.map((format) => ({
    id: format,
    label: FORMAT_LABELS[format],
    detail: getDeliveryLabel(format),
    price: prices[format],
  }));

  // --- What is added to the cart ---
  // The book is its own product, with its Google Books id and title
  const product = {
    id: book?.id,
    mediaType: "book",
    title: book?.title,
    imageUrl: book?.coverUrl,
  };

  return (
    <section>
      <h2>The book behind the story</h2>

      {isFetching && <Loader label="Loading book" />}

      {/* Google Books could not be reached, so trying again can help */}
      {!isFetching && error && (
        <LoadError title="We couldn't load the book" onRetry={refetch} />
      )}

      {/* Google Books answered, but has no match for this story */}
      {!isFetching && !error && !book && (
        <p className={styles.fallback}>
          We couldn't find the book behind this {storyType}.
        </p>
      )}

      {!isFetching && book && (
        <>
          <p className={styles.intro}>
            Read {bookAuthor ? `${bookAuthor}'s` : "the"} novel that inspired
            the {storyType}.
          </p>

          {/* --- Book card --- */}
          <div className={styles.card}>
            {book.coverUrl ? (
              <img src={book.coverUrl} alt="" className={styles.cover} />
            ) : (
              <div className={styles.cover} aria-hidden="true" />
            )}

            <div>
              <h3 className={styles.title}>{book.title}</h3>
              {bookAuthor && <p className={styles.author}>by {bookAuthor}</p>}
              {book.description && (
                <p className={styles.description}>{book.description}</p>
              )}
              {facts.length > 0 && (
                <p className={styles.facts}>{facts.join(" · ")}</p>
              )}
            </div>
          </div>

          <PriceOptions product={product} options={options} />
        </>
      )}
    </section>
  );
};

export default BookSection;
