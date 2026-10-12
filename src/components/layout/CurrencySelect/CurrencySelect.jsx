import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENCIES } from "../../../features/currency/currencyConfig";
import { selectCurrency } from "../../../features/currency/currencySelectors";
import { setCurrency } from "../../../features/currency/currencySlice";
import styles from "./CurrencySelect.module.css";

// ===== Currency select =====
// Lets the visitor choose the currency that prices are converted to.
// Shown at the bottom of the account menu, for everyone, signed in or not.

const CurrencySelect = () => {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);

  // Unique id that connects the label to the select
  const id = useId();

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        Currency
      </label>

      <select
        id={id}
        className={styles.select}
        value={currency}
        onChange={(e) => dispatch(setCurrency(e.target.value))}
      >
        {CURRENCIES.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
