import { addNewAuctionItem } from "../Controllers/auctionController.js";
import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
const auctionRouter = express.Router();
auctionRouter.post(
  "/add-item",
  isAuthenticated,
  isAuthorized("Auctioneer"),
  addNewAuctionItem
);

export default auctionRouter;
