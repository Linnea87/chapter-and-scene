import { useEffect } from "react";
import { useDispatch } from "react-redux";
import subscribeToAuthChanges from "../services/supabase/auth/subscribeToAuthChanges";
import { supabaseApi } from "../services/supabase/supabaseApi";
import { toAuthUser } from "../features/auth/authHelpers";
import { setUser } from "../features/auth/authSlice";

// ===== Auth listener hook =====
// Keeps Redux in sync with Supabase: runs on page load and on every
// sign in and sign out. Used once, at the top of the app.

const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      dispatch(setUser(toAuthUser(user)));

      // Signed out: forget cached orders and library,
      // so the next person does not see them
      if (!user) dispatch(supabaseApi.util.resetApiState());
    });

    return unsubscribe;
  }, [dispatch]);
};

export default useAuthListener;
