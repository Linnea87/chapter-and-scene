import formatPrice from "../../../utils/formatPrice";
import styles from "./PriceOptions.module.css";

// ===== Price options =====
// Lists the formats a title can be bought in, with prices.
// options: [{ id, label, detail?, price }]. The title is optional.
const PriceOptions = ({ title, options }) => (
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
          <span className={styles.price}>{formatPrice(option.price)}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default PriceOptions;
