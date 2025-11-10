import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.loading = false;
    },
    logoutFailed(state) {
      state.loading = false;
    },
    clearAllErrors(state) {
      state.loading = false;
    },
  },
});

export const registerRequest = (formData) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/user/register",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
  } catch (err) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(err.response?.data?.message || "Registration Failed");
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/user/logout",
      { withCredentials: true }
    );

    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
  } catch (err) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(err.response?.data?.message || "Logout Failed");
  } finally {
    dispatch(userSlice.actions.clearAllErrors());
  }
};
