import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import getLibraryItems from "./library/getLibraryItems";
import getOrder from "./orders/getOrder";

// ===== Supabase API =====
// RTK Query service for reading data from Supabase.
// Gives loading, error and retry states like the TMDb and Google Books services.
// The Supabase calls live in their own service files, this only wraps them.

// Runs a Supabase service function and returns it in the shape RTK Query expects
const runQuery = async (serviceFunction, ...args) => {
  try {
    return { data: await serviceFunction(...args) };
  } catch (error) {
    console.warn("Supabase request failed:", error);

    return { error: { message: error.message } };
  }
};

export const supabaseApi = createApi({
  reducerPath: "supabaseApi",
  // No base URL, every endpoint calls a Supabase function instead
  baseQuery: fakeBaseQuery(),
  // Cache labels, used to fetch the library again after a purchase
  tagTypes: ["Library"],
  endpoints: (build) => ({
    getOrder: build.query({
      queryFn: (orderId) => runQuery(getOrder, orderId),
    }),
    getLibraryItems: build.query({
      queryFn: () => runQuery(getLibraryItems),
      providesTags: ["Library"],
    }),
  }),
});

export const { useGetOrderQuery, useGetLibraryItemsQuery } = supabaseApi;
