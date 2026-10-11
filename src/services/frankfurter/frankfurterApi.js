import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FRANKFURTER_BASE_URL } from "./frankfurterConfig";
import {
  BASE_CURRENCY,
  CURRENCIES,
} from "../../features/currency/currencyConfig";

// ===== Frankfurter service =====
// Fetches exchange rates from USD to the other currencies in the shop.

// The currencies to convert to, e.g. "SEK,GBP"
const TARGET_CURRENCIES = CURRENCIES.map((currency) => currency.code)
  .filter((code) => code !== BASE_CURRENCY)
  .join(",");

export const frankfurterApi = createApi({
  reducerPath: "frankfurterApi",
  baseQuery: fetchBaseQuery({ baseUrl: FRANKFURTER_BASE_URL }),
  endpoints: (builder) => ({
    // Returns the rates as { SEK: 9.97, GBP: 0.76 }
    getRates: builder.query({
      query: () => ({
        url: "latest",
        params: { base: BASE_CURRENCY, symbols: TARGET_CURRENCIES },
      }),
      transformResponse: (response) => response.rates,
      // Rates change once a day, so they are kept for an hour after use
      keepUnusedDataFor: 60 * 60,
    }),
  }),
});

export const { useGetRatesQuery } = frankfurterApi;
