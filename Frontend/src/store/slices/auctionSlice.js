import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
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
    deleteAuctionItemRequest(state) {
      state.loading = true;
    },
    deleteAuctionItemSuccess(state) {
      state.loading = false;
    },
    deleteAuctionItemFailed(state) {
      state.loading = false;
    },
    republishItemRequest(state) {
      state.loading = true;
    },
    republishItemSuccess(state) {
      state.loading = false;
    },
    republishItemFailed(state) {
      state.loading = false;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const getAllAuctionItems = () => async (dispatch) => {
  dispatch(auctionSlice.actions.getAllAuctionItemRequest());
  try {
    const response = await axios.get(`${BASE_URL}/auction/all-items`, {
      withCredentials: true,
    });

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
    const response = await axios.get(`${BASE_URL}/auction/${id}`, {
      withCredentials: true,
    });
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
    const response = await axios.post(`${BASE_URL}/auction/add-item`, data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(auctionSlice.actions.createAuctionSuccess());
    toast.success(response.data.message);
    dispatch(getAllAuctionItems());
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
    const response = await axios.get(`${BASE_URL}/auction/myitems`, {
      withCredentials: true,
    });
    dispatch(auctionSlice.actions.getMyAuctionSuccess(response.data.items));
  } catch (err) {
    dispatch(auctionSlice.actions.getMyAuctionFailed());
    toast.error(err.message);
  } finally {
    dispatch(auctionSlice.actions.clearErrors());
  }
};

export const deleteAuction = (id) => async (dispatch) => {
  dispatch(auctionSlice.actions.deleteAuctionItemRequest());
  try {
    const response = await axios.delete(`${BASE_URL}/auction/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(auctionSlice.actions.deleteAuctionItemSuccess(response.data));
    toast.success(response.data.message);
    dispatch(getMyAuction());
  } catch (err) {
    dispatch(auctionSlice.actions.deleteAuctionItemFailed());
    toast.error(err.message);
  } finally {
    dispatch(auctionSlice.actions.clearErrors());
  }
};

export const republishAuction = (id, data) => async (dispatch) => {
  dispatch(auctionSlice.actions.republishItemRequest());
  try {
    const response = await axios.put(
      `${BASE_URL}/auction/item/republish/${id}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(auctionSlice.actions.republishItemSuccess());
    toast.success(response.data.message);
  } catch (err) {
    dispatch(auctionSlice.actions.republishItemFailed());
    toast.error(err.message);
    dispatch(getMyAuction());
    dispatch(getAllAuctionItems());
  } finally {
    dispatch(auctionSlice.actions.clearErrors());
  }
};
