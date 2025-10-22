import {
  addNewAuctionItem,
  getAllItems,
  getAuctionDetails,
  getMyAuctionDetails,
} from "../Controllers/auctionController.js";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
const auctionRouter = express.Router();
auctionRouter.post(
  "/add-item",
  isAuthenticated,
  isAuthorized("Auctioneer"),
  addNewAuctionItem
);
auctionRouter.get("/all-items", getAllItems);
auctionRouter.get("/auction/:id", isAuthenticated, getAuctionDetails);
auctionRouter.get(
  "/myitems",
  isAuthenticated,
  isAuthorized("Auctioneer"),
  getMyAuctionDetails
);

export default auctionRouter;
