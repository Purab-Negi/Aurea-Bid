import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { commissionSlice } from "./slices/commissionSlice";
import { auctionSlice } from "./slices/auctionSlice";
import superAdminSlice from "./slices/superAdminSlice";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    commission: commissionSlice.reducer,
    auction: auctionSlice.reducer,
    superAdmin: superAdminSlice.reducer,
  },
});
