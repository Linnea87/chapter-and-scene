import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GOOGLE_BOOKS_BASE_URL, MAX_RESULTS } from "./googleBooksConfig";
import buildBookQuery from "./buildBookQuery";
import { mapBook, pickBestMatch } from "./googleBooksMappers";

// ===== Google Books service =====
// Finds the book a movie or series is based on, and fetches one book by id

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
          maxResults: MAX_RESULTS,
          // Prices are returned in USD, the shop's base currency
          country: "US",
          // Optional, only sent when a key exists in .env
          key: import.meta.env.VITE_GOOGLE_BOOKS_KEY,
        },
      }),
      // Returns one mapped book, or null if nothing was found
      transformResponse: (response) => pickBestMatch(response.items),
    }),

    // --- One book ---
    // Used in My library, where only the Google Books id is saved
    getBook: builder.query({
      query: (id) => ({
        url: `volumes/${id}`,
        params: {
          country: "US",
          key: import.meta.env.VITE_GOOGLE_BOOKS_KEY,
        },
      }),
      transformResponse: (response) => mapBook(response),
    }),
  }),
});

export const { useFindBookQuery, useGetBookQuery } = googleBooksApi;
