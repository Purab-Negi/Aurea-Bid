import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    message: null,
    error: null,
    otpVerified: false,
    emailForReset: null,
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
    },
    forgotSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    forgotFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    verifyOtpSuccess(state, action) {
      state.loading = false;
      state.otpVerified = true;
      state.message = action.payload;
    },
    verifyOtpFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.otpVerified = false;
      state.emailForReset = null;
    },
    resetFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setEmail(state, action) {
      state.loading = false;
      state.emailForReset = action.payload;
    },
    clear(state) {
      state.error = null;
      state.message = null;
    },
  },
});

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.request());
  try {
    const response = await axios.post(
      `${BASE_URL}/user/password/forgot`,
      { email },
      { withCredentials: true }
    );
    dispatch(authSlice.actions.forgotSuccess(response.data?.message));
    dispatch(authSlice.actions.setEmail(email));
  } catch (err) {
    dispatch(authSlice.actions.forgotFailure(err.response?.data?.message));
    toast.error(err.message);
  } finally {
    dispatch(authSlice.actions.clear());
  }
};

export const verifyOtp = (email, otp) => async (dispatch) => {
  dispatch(authSlice.actions.request());
  try {
    const response = await axios.post(
      `${BASE_URL}/user/password/verify-password`,
      { email, otp },
      { withCredentials: true }
    );
    dispatch(authSlice.actions.verifyOtpSuccess(response.data?.message));
  } catch (err) {
    dispatch(authSlice.actions.failure(err.response?.data?.message));
    toast.error(err.message);
  } finally {
    dispatch(authSlice.actions.clear());
  }
};

export const resetPassword = (email, newPassword) => async (dispatch) => {
  dispatch(authSlice.actions.request());
  try {
    const response = await axios.post(
      `${BASE_URL}/user/password/reset`,
      { email, newPassword },
      { withCredentials: true }
    );
    dispatch(authSlice.actions.resetSuccess(response.message));
  } catch (err) {
    dispatch(authSlice.actions.resetFailure());
    toast.error(err.message);
  } finally {
    dispatch(authSlice.actions.clear());
  }
};
