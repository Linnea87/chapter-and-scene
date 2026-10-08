import { supabase } from "../supabaseClient";

// ===== Sign in =====
// Logs in with email and password.
// Throws on failure, so the caller can show the error message.

const signInUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data.user;
};

export default signInUser;
