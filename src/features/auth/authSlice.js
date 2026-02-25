import { createSlice } from "@reduxjs/toolkit";
import {
  completeSignupUser,
  forgetPassword,
  loginUser,
  signupUser,
} from "./authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    expiresAt: null,
    message: null,
    email: null,
  },
  reducers: {
    logout: (state) => {
      ((state.user = null),
        (state.isAuthenticated = false),
        (state.error = null));
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearVerificationState: (state) => {
      state.message = null;
      state.expiresAt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.expiresAt = action.payload.data.expiresAt;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(completeSignupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeSignupUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(completeSignupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.expiresAt = action.payload.data.expiresAt;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setEmail, clearVerificationState } = authSlice.actions;
export default authSlice.reducer;
