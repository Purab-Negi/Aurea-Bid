import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { isAuthorized } from "../middlewares/auth.js";
import { placeBid } from "../Controllers/bidController.js";
import { checkAuctionEndTime } from "../middlewares/checkAuctionActive.js";
const bidRouter = express.Router();
bidRouter.post(
  "/place/:id",
  isAuthenticated,
  isAuthorized("Bidder"),
  checkAuctionEndTime,
  placeBid
);
export default bidRouter;
