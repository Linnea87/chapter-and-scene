import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import addLibraryItems from "./library/addLibraryItems";
import getLibraryItems from "./library/getLibraryItems";
import getOrder from "./orders/getOrder";

// ===== Supabase API =====
// RTK Query service for reading and saving data in Supabase.
// Gives loading, error and retry states like the TMDb and Google Books services.
// The Supabase calls live in their own service files, this only wraps them.

// Runs a Supabase service function and returns it in the shape RTK Query expects.
// RTK Query needs a value, so functions that return nothing give null.
const runQuery = async (serviceFunction, ...args) => {
  try {
    const data = await serviceFunction(...args);
    return { data: data ?? null };
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
    addLibraryItems: build.mutation({
      queryFn: (items) => runQuery(addLibraryItems, items),
      // The library has changed, so getLibraryItems fetches it again
      invalidatesTags: ["Library"],
    }),
  }),
});

export const {
  useGetOrderQuery,
  useGetLibraryItemsQuery,
  useAddLibraryItemsMutation,
} = supabaseApi;
