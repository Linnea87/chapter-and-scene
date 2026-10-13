// ===== Sign out =====
// Ends the current session.
// Throws on failure, so the caller can handle the error.

import { supabase } from "../supabaseClient";

const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};

export default signOutUser;
