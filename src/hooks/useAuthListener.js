import { useEffect } from "react";
import { useDispatch } from "react-redux";
import subscribeToAuthChanges from "../services/supabase/auth/subscribeToAuthChanges";
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
    });

    return unsubscribe;
  }, [dispatch]);
};

export default useAuthListener;
