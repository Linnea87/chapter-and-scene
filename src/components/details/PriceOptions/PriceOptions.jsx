import formatPrice from "../../../utils/formatPrice";
import styles from "./PriceOptions.module.css";

// ===== Price options =====
// Lists the formats a title can be bought in, with prices.
// options: [{ id, label, price }]

const PriceOptions = ({ title, options }) => (
  <section>
    <h2>{title}</h2>

    <ul className={styles.list}>
      {options.map((option) => (
        <li key={option.id} className={styles.option}>
          <span>{option.label}</span>
          <span className={styles.price}>{formatPrice(option.price)}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default PriceOptions;
