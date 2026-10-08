import { supabase } from "../supabaseClient";

// ===== Sign up =====
// Creates a new account in Supabase Auth.
// Throws on failure, so the caller can show the error message.

const signUpUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  return data.user;
};

export default signUpUser;
