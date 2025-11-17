import axios from "axios";
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import { getAllAuctionItems } from "./auctionSlice";

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    loading: false,
    monthlyRevenue: [],
    totalAuctioneers: [],
    totalBidders: [],
    paymentProof: [],
    singlePaymentProof: {},
    error: null,
  },

  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
    },

    monthlyRevenueSuccess(state, action) {
      state.loading = false;
      state.monthlyRevenue = action.payload;
    },
    monthlyRevenueFailed(state, action) {
      state.loading = false;
      state.monthlyRevenue = [];
      state.error = action.payload;
    },
    allUsersSuccess(state, action) {
      state.loading = false;
      state.totalAuctioneers = action.payload.auctioneersArray;
      state.totalBidders = action.payload.biddersArray;
    },
    allUsersFailed(state, action) {
      state.loading = false;
      state.totalAuctioneers = [];
      state.totalBidders = [];
      state.error = action.payload;
    },

    paymentProofSuccess(state, action) {
      state.loading = false;
      state.paymentProof = action.payload;
    },
    paymentProofFailed(state, action) {
      state.loading = false;
      state.paymentProof = [];
      state.error = action.payload;
    },

    singleProofSuccess(state, action) {
      state.loading = false;
      state.singlePaymentProof = action.payload;
    },
    singleProofFailed(state, action) {
      state.loading = false;
      state.singlePaymentProof = {};
      state.error = action.payload;
    },

    deletePaymentProofSuccess(state) {
      state.loading = false;
    },
    deletePaymentProofFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateProofSuccess(state) {
      state.loading = false;
    },
    updateProofFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteAuctionSuccess(state) {
      state.loading = false;
    },
    deleteAuctionFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearErrors(state) {
      state.error = null;
    },
  },
});

export const getAllUsers = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.request());
  try {
    const res = await axios.get(
      "http://localhost:5000/api/v1/superadmin/users/getall",
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.allUsersSuccess(res.data));
  } catch (err) {
    dispatch(superAdminSlice.actions.allUsersFailed(err.message));
    toast.error(err.message);
  }
};

export const getMonthlyRevenue = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.request());
  try {
    const res = await axios.get(
      "http://localhost:5000/api/v1/superadmin/monthlyincome",
      { withCredentials: true }
    );
    dispatch(
      superAdminSlice.actions.monthlyRevenueSuccess(res.data.totalMonthRevenue)
    );
  } catch (err) {
    dispatch(superAdminSlice.actions.monthlyRevenueFailed(err.message));
    toast.error(err.message);
  }
};

export const getPaymentProof = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.request());
  try {
    const res = await axios.get(
      "http://localhost:5000/api/v1/superadmin/paymentproofs/getall",
      { withCredentials: true }
    );
    dispatch(
      superAdminSlice.actions.paymentProofSuccess(res.data.paymentProofs)
    );
  } catch (err) {
    dispatch(superAdminSlice.actions.paymentProofFailed(err.message));
    toast.error(err.message);
  }
};

export const deletePaymentProof = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.request());
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/v1/superadmin/paymentproof/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(superAdminSlice.actions.deletePaymentProofSuccess());
    toast.success(res.data.message);
    dispatch(getPaymentProof());
  } catch (err) {
    dispatch(superAdminSlice.actions.deletePaymentProofFailed(err.message));
    toast.error(err.message);
  }
};

export const singlePaymentProofDetail = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.request());
  try {
    const res = await axios.get(
      `http://localhost:5000/api/v1/superadmin/paymentproof/${id}`,
      { withCredentials: true }
    );
    dispatch(
      superAdminSlice.actions.singleProofSuccess(res.data.paymentProofDetail)
    );
  } catch (err) {
    dispatch(superAdminSlice.actions.singleProofFailed(err.message));
    toast.error(err.message);
  }
};

export const updatePaymentProof = (id, status, amount) => async (dispatch) => {
  dispatch(superAdminSlice.actions.request());
  try {
    const res = await axios.put(
      `http://localhost:5000/api/v1/superadmin/paymentproof/status/update/${id}`,
      { status, amount },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(superAdminSlice.actions.updateProofSuccess());
    toast.success(res.data.message);
  } catch (err) {
    dispatch(superAdminSlice.actions.updateProofFailed(err.message));
    toast.error(err.message);
  }
};

export const deleteAuctionItem = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.request());
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/v1/superadmin/auctionitem/delete/${id}`,
      { withCredentials: true }
    );

    dispatch(superAdminSlice.actions.deleteAuctionSuccess());
    toast.success(res.data.message);
    dispatch(getAllAuctionItems());
  } catch (err) {
    dispatch(superAdminSlice.actions.deleteAuctionFailed(err.message));
    toast.error(err.message);
  }
};

export const clearAllSuperAdminSliceError = () => (dispatch) => {
  dispatch(superAdminSlice.actions.clearErrors());
};

export default superAdminSlice;
