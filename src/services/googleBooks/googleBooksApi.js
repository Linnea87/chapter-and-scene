import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GOOGLE_BOOKS_BASE_URL,
  LANGUAGE,
  MAX_RESULTS,
} from "./googleBooksConfig";
import { buildBookQuery, pickBestMatch } from "./googleBooksHelpers";

// ===== Google Books service =====
// Finds the book a film or series is based on

export const googleBooksApi = createApi({
  reducerPath: "googleBooksApi",
  baseQuery: fetchBaseQuery({ baseUrl: GOOGLE_BOOKS_BASE_URL }),
  endpoints: (builder) => ({
    findBook: builder.query({
      query: ({ title, author }) => ({
        url: "volumes",
        params: {
          q: buildBookQuery(title, author),
          printType: "books",
          langRestrict: LANGUAGE,
          maxResults: MAX_RESULTS,
          // Optional, only sent when a key exists in .env
          key: import.meta.env.VITE_GOOGLE_BOOKS_KEY,
        },
      }),
      // Returns one mapped book, or null if nothing was found
      transformResponse: (response) => pickBestMatch(response.items),
    }),
  }),
});

export const { useFindBookQuery } = googleBooksApi;
