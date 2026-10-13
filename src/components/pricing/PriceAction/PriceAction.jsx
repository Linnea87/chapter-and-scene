// ===== Price action =====
// What the user can do with one price option on a detail page:
// - already bought: a link to My library instead of buying it twice
// - a season of a bought series: "Included", the link is on the whole series
// - an active rental: the time left, e.g. "Rented · 31 h left"
// - otherwise: the add to cart button
// item: a cart item from createCartItem

import useOwnedItem from "../../../hooks/useOwnedItem";
import { getLibraryLabel } from "../../../features/library/libraryHelpers";
import AddToCartButton from "../../cart/AddToCartButton/AddToCartButton";
import ButtonLink from "../../ui/buttons/ButtonLink/ButtonLink";
import styles from "./PriceAction.module.css";

const PriceAction = ({ item }) => {
  const ownedItem = useOwnedItem(item);

  // --- Not owned ---
  if (!ownedItem) return <AddToCartButton item={item} />;

  // --- Active rental ---
  if (ownedItem.format === "rent") {
    return <span className={styles.status}>{getLibraryLabel(ownedItem)}</span>;
  }

  // --- Season of a bought series ---
  // Owned through another format, so only the whole series links to the library
  if (ownedItem.format !== item.format) {
    return <span className={styles.status}>Included</span>;
  }

  // --- Bought ---
  return (
    <ButtonLink to="/library" variant="text">
      In your library
      <span className="visually-hidden">: {item.label}</span>
    </ButtonLink>
  );
};

export default PriceAction;
