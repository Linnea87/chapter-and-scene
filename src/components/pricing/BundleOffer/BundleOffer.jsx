import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOwnedItem from "../../../hooks/useOwnedItem";
import { useFindBookQuery } from "../../../services/googleBooks/googleBooksApi";
import { BOOK_FORMATS, FORMAT_LABELS } from "../../../features/cart/cartConfig";
import {
  createCartItem,
  createCartKey,
  findConflictingItems,
} from "../../../features/cart/cartHelpers";
import { selectCartItems } from "../../../features/cart/cartSelectors";
import { addItem, removeItem } from "../../../features/cart/cartSlice";
import {
  getBookPrices,
  getBundlePrices,
} from "../../../features/pricing/pricingHelpers";
import { BUNDLE_DISCOUNT } from "../../../features/pricing/pricingConfig";
import Button from "../../ui/buttons/Button/Button";
import FilterChips from "../../ui/forms/FilterChips/FilterChips";
import Price from "../Price/Price";
import styles from "./BundleOffer.module.css";

// ===== Bundle offer =====
// Offers the whole story and its book together at a lower price,
// e.g. buying the movie and the paperback. The user picks the book format.
// "Add both" adds both to the cart. A rental of the same movie is replaced.
// Hidden when the book is not found, or when the user already owns the story.
// title: e.g. "Movie + book bundle"
// description: e.g. "Buy the movie and the book together."
// product, option: what is watched, e.g. the movie and its "Buy" option
// book: { title, author, storyId } to find the book in Google Books

// The book formats as options for the format chips
const FORMAT_OPTIONS = BOOK_FORMATS.map((format) => ({
  id: format,
  label: FORMAT_LABELS[format],
}));

const BundleOffer = ({ title, description, product, option, book }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [format, setFormat] = useState("ebook");

  // Same request as the book tab, so it comes from the cache
  const { currentData: foundBook } = useFindBookQuery(
    { title: book.title, author: book.author },
    { skip: !book.title },
  );

  const watchItem = createCartItem(product, option);
  const ownedWatchItem = useOwnedItem(watchItem);

  if (!foundBook || ownedWatchItem) return null;

  // --- The two items in the bundle ---
  const bookPrices = getBookPrices(foundBook);
  const bookItem = createCartItem(
    {
      id: foundBook.id,
      mediaType: "book",
      title: foundBook.title,
      imageUrl: foundBook.coverUrl,
      storyId: book.storyId,
    },
    { id: format, label: FORMAT_LABELS[format], price: bookPrices[format] },
  );

  const { price, regularPrice } = getBundlePrices(
    option.price,
    bookPrices[format],
  );

  // --- What is already in the cart ---
  const isInCart = (item) =>
    cartItems.some(
      (cartItem) =>
        cartItem.key === createCartKey(item.mediaType, item.id, item.format),
    );
  const isBundleInCart = isInCart(watchItem) && isInCart(bookItem);

  // E.g. a rental of the same movie, which the bundle replaces
  const conflictingItems = findConflictingItems(cartItems, watchItem);

  // --- Handlers ---
  // Each part is only added once, so a book already in the cart is not doubled
  const handleAdd = () => {
    conflictingItems.forEach((item) => dispatch(removeItem(item.key)));
    if (!isInCart(watchItem)) dispatch(addItem(watchItem));
    if (!isInCart(bookItem)) dispatch(addItem(bookItem));
  };

  // --- Render ---
  return (
    <section className={styles.offer} aria-labelledby="bundle-offer-title">
      <h2 id="bundle-offer-title" className={styles.title}>
        {title}
      </h2>
      <p className={styles.text}>
        {description} Save {BUNDLE_DISCOUNT * 100}% on the book.
      </p>

      <FilterChips
        label="Book format in the bundle"
        options={FORMAT_OPTIONS}
        activeId={format}
        onChange={setFormat}
      />

      <div className={styles.footer}>
        <p className={styles.prices}>
          <span className={styles.price}>
            <Price amount={price} />
          </span>{" "}
          <s className={styles.regularPrice}>
            <Price amount={regularPrice} showConversion={false} />
          </s>
        </p>

        <Button onClick={handleAdd} disabled={isBundleInCart}>
          {isBundleInCart ? "In cart" : "Add both"}
        </Button>
      </div>

      {conflictingItems.length > 0 && !isBundleInCart && (
        <p className={styles.note}>
          Replaces{" "}
          {conflictingItems.map((item) => item.label.toLowerCase()).join(", ")}{" "}
          in your cart.
        </p>
      )}
    </section>
  );
};

export default BundleOffer;
