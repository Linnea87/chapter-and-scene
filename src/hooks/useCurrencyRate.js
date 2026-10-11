import { useSelector } from "react-redux";
import { useGetRatesQuery } from "../services/frankfurter/frankfurterApi";
import { BASE_CURRENCY } from "../features/currency/currencyConfig";
import { selectCurrency } from "../features/currency/currencySelectors";

// ===== Currency rate hook =====
// Returns { currency, rate } for the selected currency, e.g. { currency: "SEK", rate: 9.97 }.
// Returns null when USD is selected, or when the rates could not be fetched,
// so only the USD price is shown.

const useCurrencyRate = () => {
  const currency = useSelector(selectCurrency);
  const isBaseCurrency = currency === BASE_CURRENCY;

  // No rates are needed while USD is selected
  const { data: rates } = useGetRatesQuery(undefined, {
    skip: isBaseCurrency,
  });

  const rate = rates?.[currency];
  if (isBaseCurrency || !rate) return null;

  return { currency, rate };
};

export default useCurrencyRate;
