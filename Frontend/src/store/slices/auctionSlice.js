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
