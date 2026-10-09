// ===== Auth helpers =====

// Keeps only what the app needs from a Supabase user, so Redux
// holds plain values instead of the whole Supabase object.
export const toAuthUser = (user) =>
  user ? { id: user.id, email: user.email } : null;

// Returns the page to go to after log in or sign up.
// ProtectedRoute sets "from" when a guest tried to open a protected page,
// otherwise the user goes to Home.
export const getRedirectPath = (location) => location.state?.from ?? "/";
