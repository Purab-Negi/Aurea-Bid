import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { commissionSlice } from "./slices/commissionSlice";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    commission: commissionSlice.reducer,
  },
});
