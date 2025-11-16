import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router-dom";
import { toast } from "react-toastify";

export const auctionSlice = createSlice({
  name: "auction",
  initialState: {
    loading: false,
    itemDetail: {},
    auctionDetail: {},
    auctionBidders: [],
    myAuction: [],
    allAuctions: [],
    error: null,
  },
  reducers: {
    getAllAuctionItemRequest(state) {
      state.loading = true;
    },
    getAllAuctionItemSuccess(state, action) {
      state.loading = false;
      state.allAuctions = action.payload;
    },
    getAllAuctionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getAuctionDetailRequest(state) {
      state.loading = true;
    },
    getAuctionDetailSuccess(state, action) {
      state.loading = false;
      state.auctionDetail = action.payload.item;
      state.auctionBidders = action.payload.bidders;
    },
    getAuctionDetailFailed(state, action) {
      state.loading = false;
      state.auctionDetail = {};
      state.auctionBidders = [];
      state.error = action.payload;
    },
    createAuctionRequest(state) {
      state.loading = true;
    },
    createAuctionSuccess(state) {
      state.loading = false;
    },
    createAuctionFailed(state) {
      state.loading = false;
    },
    getMyAuctionRequest(state) {
      state.loading = true;
      state.myAuction = [];
    },
    getMyAuctionSuccess(state, action) {
      state.loading = false;
      state.myAuction = action.payload;
    },
    getMyAuctionFailed(state) {
      state.loading = false;
      state.myAuction = [];
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const getAllAuctionItems = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getAllAuctionItemRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/auction/all-items",
      { withCredentials: true }
    );

    dispatch(
      auctionSlice.actions.getAllAuctionItemSuccess(response.data.items)
    );
  } catch (err) {
    dispatch(
      auctionSlice.actions.getAllAuctionFailure(
        err.response?.data?.message || "Failed to fetch auctions"
      )
    );
  }
};

export const getAuctionDetails = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.getAuctionDetailRequest());
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/auction/${id}`,
      { withCredentials: true }
    );
    dispatch(
      auctionSlice.actions.getAuctionDetailSuccess({
        item: response.data.item,
        bidders: response.data.bidders,
      })
    );
  } catch (err) {
    dispatch(
      auctionSlice.actions.getAuctionDetailFailed(
        err.response?.data?.message || "Failed to fetch auction"
      )
    );
  } finally {
    dispatch(auctionSlice.actions.clearErrors());
  }
};

export const createAuction = (data) => async (dispatch) => {
  dispatch(auctionSlice.actions.createAuctionRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/auction/add-item",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(auctionSlice.actions.createAuctionSuccess());
    toast.success(response.data.message);
  } catch (err) {
    dispatch(auctionSlice.actions.createAuctionFailed());
    toast.error(err.response.data.message);
  } finally {
    dispatch(auctionSlice.actions.clearErrors());
  }
};

export const getMyAuction = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getMyAuctionRequest());
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/auction/myitems",
      { withCredentials: true }
    );
    dispatch(auctionSlice.actions.getMyAuctionSuccess(response.data.items));
  } catch (err) {
    dispatch(auctionSlice.actions.getMyAuctionFailed());
    toast.error(err.message);
  } finally {
    dispatch(auctionSlice.actions.clearErrors());
  }
};
