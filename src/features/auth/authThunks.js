import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../app/axios";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await axios.post("auth/login", data);
      console.log(response.data);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return rejectedWithValue(error.response?.data?.message || "Login failed");
    }
  },
);
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await axios.post("auth/signup", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send verification link",
      );
      return rejectedWithValue(
        error.response?.data?.message || "Failed to send verification link",
      );
    }
  },
);

export const completeSignupUser = createAsyncThunk(
  "auth/complete-signup",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await axios.post("auth/complete-signup", data);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      return rejectedWithValue(
        error.response?.data?.message || "Signup failed",
      );
    }
  },
);

export const forgetPassword = createAsyncThunk(
  "auth/forgot-password",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await axios.post("/auth/forgot-password", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
      return rejectedWithValue(
        error.response?.data?.message || "Failed to send reset link",
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await axios.post("/auth/reset-password", data);
      console.log(response.data);
      toast.success(response.data.message);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
      return rejectedWithValue(
        error.response?.data?.message || "Failed to failed to update password",
      );
    }
  },
);
