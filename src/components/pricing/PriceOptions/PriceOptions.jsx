import { createCartItem } from "../../../features/cart/cartHelpers";
import formatPrice from "../../../utils/formatPrice";
import AddToCartButton from "../../cart/AddToCartButton/AddToCartButton";
import styles from "./PriceOptions.module.css";

// ===== Price options =====
// Lists the formats a title can be bought in, with prices and an add button.
// product: { id, mediaType, title, imageUrl } — what is bought
// options: [{ id, label, detail?, price }] — how it is bought
// The title is optional.

const PriceOptions = ({ title, product, options }) => (
  <section>
    {title && <h2>{title}</h2>}

    <ul className={styles.list}>
      {options.map((option) => (
        <li key={option.id} className={styles.option}>
          <span className={styles.text}>
            <span>{option.label}</span>
            {option.detail && (
              <span className={styles.detail}>{option.detail}</span>
            )}
          </span>

          {/* --- Price and add button --- */}
          <span className={styles.actions}>
            <span className={styles.price}>{formatPrice(option.price)}</span>
            <AddToCartButton item={createCartItem(product, option)} />
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default PriceOptions;
