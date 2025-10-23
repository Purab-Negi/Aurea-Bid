import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { proofOfCommission } from "../Controllers/commissionController.js";
const commissionRouter = express.Router();
commissionRouter.post(
  "/proof",
  isAuthenticated,
  isAuthorized("Auctioneer"),
  proofOfCommission
);

export default commissionRouter;
