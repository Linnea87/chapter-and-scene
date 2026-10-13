// ===== Bundle offer =====
// Offers the whole story and its book together at a lower price, with one row
// per book format, e.g. buying the movie and the paperback.
// The basket button adds both to the cart. A rental of the same movie is replaced.
// Shown in its own tab, so a short message is shown instead when there is
// no bundle: the book is not found, or the user already owns the story.
// description: e.g. "Buy the movie and the book together."
// product, option: what is watched, e.g. the movie and its "Buy" option
// book: { title, author, storyId } to find the book in Google Books
// Shares the row styles with PriceOptions, so the bundle rows look the same

import { useDispatch, useSelector } from "react-redux";
import { Check, ShoppingBasket } from "lucide-react";
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
import roundPrice from "../../../utils/roundPrice";
import Button from "../../ui/buttons/Button/Button";
import Loader from "../../ui/feedback/Loader/Loader";
import Price from "../Price/Price";
import optionStyles from "../PriceOptions/PriceOptions.module.css";
import styles from "./BundleOffer.module.css";

const BundleOffer = ({ description, product, option, book }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // Same request as the book tab, so it comes from the cache
  const { currentData: foundBook, isFetching } = useFindBookQuery(
    { title: book.title, author: book.author },
    { skip: !book.title },
  );

  const watchItem = createCartItem(product, option);
  const ownedWatchItem = useOwnedItem(watchItem);
  const storyType = product.mediaType === "movie" ? "movie" : "series";
  const watchName = storyType === "movie" ? "Movie" : "Series";

  // --- No bundle to offer ---
  if (isFetching) return <Loader label="Loading the bundle" />;

  if (ownedWatchItem) {
    return (
      <p className={styles.message}>
        You already own the {storyType}. You can still buy the book under Read
        the book.
      </p>
    );
  }

  if (!foundBook) {
    return (
      <p className={styles.message}>
        The bundle isn't available, since we couldn't find the book.
      </p>
    );
  }

  // --- Cart ---
  const isInCart = (item) =>
    cartItems.some(
      (cartItem) =>
        cartItem.key === createCartKey(item.mediaType, item.id, item.format),
    );

  // E.g. a rental of the same movie, which the bundle replaces
  const conflictingItems = findConflictingItems(cartItems, watchItem);

  // --- One bundle per book format ---
  const bookPrices = getBookPrices(foundBook);
  const bundles = BOOK_FORMATS.map((format) => {
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

    return {
      format,
      bookItem,
      price,
      saving: roundPrice(regularPrice - price),
      isInCart: isInCart(watchItem) && isInCart(bookItem),
    };
  });

  // --- Handlers ---
  // Each part is only added once, so a book already in the cart is not doubled
  const handleAdd = (bookItem) => {
    conflictingItems.forEach((item) => dispatch(removeItem(item.key)));
    if (!isInCart(watchItem)) dispatch(addItem(watchItem));
    if (!isInCart(bookItem)) dispatch(addItem(bookItem));
  };

  // --- Render ---
  return (
    <div className={styles.offer}>
      <p className={styles.text}>
        {description} Save {BUNDLE_DISCOUNT * 100}% on the book.
      </p>

      <ul className={optionStyles.list}>
        {bundles.map((bundle) => (
          <li key={bundle.format} className={optionStyles.option}>
            <span className={optionStyles.text}>
              <span>
                {watchName} + {FORMAT_LABELS[bundle.format]}
              </span>
              <span className={optionStyles.detail}>
                Save <Price amount={bundle.saving} showConversion={false} />
              </span>
            </span>

            {/* --- Price and add button --- */}
            <span className={optionStyles.actions}>
              <span className={optionStyles.price}>
                <Price amount={bundle.price} />
              </span>

              <Button
                variant="secondary"
                size="icon"
                onClick={() => handleAdd(bundle.bookItem)}
                disabled={bundle.isInCart}
              >
                {bundle.isInCart ? (
                  <Check size={20} aria-hidden="true" />
                ) : (
                  <ShoppingBasket size={20} aria-hidden="true" />
                )}
                <span className="visually-hidden">
                  {bundle.isInCart ? "In cart" : "Add both to cart"}:{" "}
                  {watchName} and {FORMAT_LABELS[bundle.format]}
                </span>
              </Button>
            </span>
          </li>
        ))}
      </ul>

      {conflictingItems.length > 0 && (
        <p className={styles.note}>
          Adding a bundle replaces{" "}
          {conflictingItems.map((item) => item.label.toLowerCase()).join(", ")}{" "}
          in your cart.
        </p>
      )}
    </div>
  );
};

export default BundleOffer;
