import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getAuctionDetails } from "./auctionSlice";

const bidSlice = createSlice({
  name: "bid",
  initialState: {
    loading: false,
  },
  reducers: {
    bidRequest(state) {
      state.loading = true;
    },
    bidSuccess(state) {
      state.loading = false;
    },
    bidFailed(state) {
      state.loading = false;
    },
    clearAllBidError(state) {
      state.loading = false;
    },
    updateCurrentBid(state, action) {
      if (state.auctionDetail) {
        state.auctionDetail.currentBid = action.payload;
      }
    },
  },
});

export const placeBid = (id, data) => async (dispatch) => {
  dispatch(bidSlice.actions.bidRequest());
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/bid/place/${id}`,
      data,
      {
        withCredentials: true,
      }
    );
    dispatch(bidSlice.actions.bidSuccess());
    toast.success(response.data.message);
    dispatch(bidSlice.actions.updateCurrentBid(response.data.currentBid));
    dispatch(getAuctionDetails(id));
  } catch (err) {
    dispatch(bidSlice.actions.bidFailed());
    toast.error(err.response.data.message || "Bid Failed");
  } finally {
    dispatch(bidSlice.actions.clearAllBidError());
  }
};
