// ===== Owned item hook =====
// Returns the library item when the signed-in user already has this format,
// e.g. a bought movie or an active rental, otherwise undefined.
// Guests have no library, so nothing is fetched for them.
// item: a cart item from createCartItem

import { useSelector } from "react-redux";
import { useGetLibraryItemsQuery } from "../services/supabase/supabaseApi";
import { selectIsLoggedIn } from "../features/auth/authSelectors";
import { findOwnedItem } from "../features/library/libraryHelpers";

const useOwnedItem = (item) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data: libraryItems = [] } = useGetLibraryItemsQuery(undefined, {
    skip: !isLoggedIn,
  });

  return findOwnedItem(libraryItems, item);
};

export default useOwnedItem;
