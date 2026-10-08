import { supabase } from "../supabaseClient";

// ===== Auth listener =====
// Calls the callback with the current user (or null) on page load
// and every time someone signs in or out.
// Returns a function that stops listening.

const subscribeToAuthChanges = (callback) => {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => data.subscription.unsubscribe();
};

export default subscribeToAuthChanges;
