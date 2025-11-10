import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const commissionSlice = createSlice({
  name: "commission",
  initialState: {
    loading: false,
  },
  reducers: {
    postCommissionProofRequest(state) {
      state.loading = true;
    },
    postCommissionProofSuccess(state) {
      state.loading = false;
    },
    postCommissionProofFailure(state) {
      state.loading = false;
    },
  },
});

export const commissionProof = (data) => async (dispatch) => {
  dispatch(commissionSlice.actions.postCommissionProofRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/commission/proof",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multi-part/form-data" },
      }
    );
    dispatch(commissionSlice.actions.postCommissionProofSuccess(response.data));
    toast.success(response.data.message);
  } catch (err) {
    dispatch(commissionSlice.actions.postCommissionProofFailure());
    toast.error(err.response?.data?.message || "Registration Failed");
  }
};
