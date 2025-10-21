import {
  addNewAuctionItem,
  getAllItems,
  getAuctionDetails,
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

export default auctionRouter;
