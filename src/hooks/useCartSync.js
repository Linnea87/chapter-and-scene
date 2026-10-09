import { useEffect, useRef } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import getCartItems from "../services/supabase/cart/getCartItems";
import syncCartItems from "../services/supabase/cart/syncCartItems";
import { selectUser } from "../features/auth/authSelectors";
import { mergeCartItems } from "../features/cart/cartHelpers";
import { selectCartItems } from "../features/cart/cartSelectors";
import { clearCart, setCartItems } from "../features/cart/cartSlice";

// ===== Cart sync hook =====
// Keeps the cart in sync with the signed-in user's account.
// Used once, at the top of the app.

const useCartSync = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const userId = useSelector(selectUser)?.id ?? null;
  const cartItems = useSelector(selectCartItems);

  // The user the cart was last loaded for, and the user before this render
  const loadedUserId = useRef(null);
  const previousUserId = useRef(null);

  // --- Sign in and sign out ---
  useEffect(() => {
    const wasLoggedIn = previousUserId.current !== null;
    previousUserId.current = userId;

    // Signed out: empty the cart so the next person does not see it
    if (!userId) {
      loadedUserId.current = null;
      if (wasLoggedIn) dispatch(clearCart());
      return;
    }
    // Signed in: merge the guest cart into the saved account cart
    let isCancelled = false;

    const loadAccountCart = async () => {
      try {
        const accountItems = await getCartItems();
        if (isCancelled) return;

        const guestItems = selectCartItems(store.getState());
        loadedUserId.current = userId;
        dispatch(setCartItems(mergeCartItems(guestItems, accountItems)));
      } catch (error) {
        console.error("Could not load the saved cart:", error);
      }
    };
    loadAccountCart();

    return () => {
      isCancelled = true;
    };
  }, [userId, dispatch, store]);

  useEffect(() => {
    if (!userId || loadedUserId.current !== userId) return;

    syncCartItems(cartItems).catch((error) => {
      console.error("Could not save the cart:", error);
    });
  }, [cartItems, userId]);
};

export default useCartSync;
