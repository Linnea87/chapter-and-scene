import { createSlice } from "@reduxjs/toolkit";

// ===== State =====
// isLoading is true until Supabase has told us if someone is signed in,
// so the app does not flash a "logged out" view on page load.

const initialState = {
  user: null,
  isLoading: true,
};

// ===== Slice =====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Expects { id, email } or null, see toAuthUser
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
