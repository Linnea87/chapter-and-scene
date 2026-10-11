import useCurrencyRate from "../../../hooks/useCurrencyRate";
import { convertPrice } from "../../../features/currency/currencyHelpers";
import formatPrice from "../../../utils/formatPrice";
import styles from "./Price.module.css";

// ===== Price =====
// Shows a USD price, and the converted amount next to it when another currency
// is selected, e.g. "$14.99 (≈ SEK 149.45)". The shop always charges in USD.
// amount: a price in USD

const Price = ({ amount }) => {
  const conversion = useCurrencyRate();

  return (
    <>
      {formatPrice(amount)}
      {conversion && (
        <span className={styles.converted}>
          {" "}
          (≈{" "}
          {formatPrice(
            convertPrice(amount, conversion.rate),
            conversion.currency,
          )}
          )
        </span>
      )}
    </>
  );
};

export default Price;
