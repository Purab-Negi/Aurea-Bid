import express from "express";
import {
  deleteAuctionItem,
  getAllPaymentProofs,
} from "../Controllers/superAdminController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
const superAdminRouter = express.Router();

superAdminRouter.delete(
  "/auctionitem/delete/:id",
  isAuthenticated,
  isAuthorized("Super Admin"),
  deleteAuctionItem
);
superAdminRouter.get(
  "/paymentproofs/getall",
  isAuthenticated,
  isAuthorized("Super Admin"),
  getAllPaymentProofs
);

export default superAdminRouter;
