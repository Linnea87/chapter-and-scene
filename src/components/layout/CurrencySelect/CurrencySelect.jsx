import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENCIES } from "../../../features/currency/currencyConfig";
import { selectCurrency } from "../../../features/currency/currencySelectors";
import { setCurrency } from "../../../features/currency/currencySlice";
import styles from "./CurrencySelect.module.css";

// ===== Currency select =====
// Lets the visitor choose the currency that prices are converted to.
// Shown in the header for everyone, signed in or not.
// The look is a placeholder until the design round.

const CurrencySelect = () => {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);

  // Unique id that connects the label to the select
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="visually-hidden">
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
