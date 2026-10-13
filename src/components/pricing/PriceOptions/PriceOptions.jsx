// ===== Price options =====
// Lists the formats a title can be bought in, with prices and what the user can do:
// add to cart, or see that the format is already in their library.
// product: { id, mediaType, title, imageUrl } — what is bought
// options: [{ id, label, detail?, price }] — how it is bought
// The title is optional.

import { createCartItem } from "../../../features/cart/cartHelpers";
import Price from "../Price/Price";
import PriceAction from "../PriceAction/PriceAction";
import styles from "./PriceOptions.module.css";

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

          {/* --- Price and action --- */}
          <span className={styles.actions}>
            <span className={styles.price}>
              <Price amount={option.price} />
            </span>
            <PriceAction item={createCartItem(product, option)} />
          </span>
        </li>
      ))}
    </ul>
  </section>
);

export default PriceOptions;
