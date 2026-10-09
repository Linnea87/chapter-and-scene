// ===== Auth selectors =====
// Components read auth data through these, so they do not depend on the state shape.

export const selectUser = (state) => state.auth.user;

export const selectIsLoggedIn = (state) => state.auth.user !== null;

export const selectIsAuthLoading = (state) => state.auth.isLoading;
