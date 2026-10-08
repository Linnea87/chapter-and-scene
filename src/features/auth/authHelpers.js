// ===== Auth helpers =====

// Keeps only what the app needs from a Supabase user, so Redux
// holds plain values instead of the whole Supabase object.
export const toAuthUser = (user) =>
  user ? { id: user.id, email: user.email } : null;
