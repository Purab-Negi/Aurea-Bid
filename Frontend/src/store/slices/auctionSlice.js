import AuctionItem from "@/pages/AuctionItem";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
