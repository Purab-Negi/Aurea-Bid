import express from "express";
import {
  deleteAuctionItem,
  deletePaymentProof,
  getAllPaymentProofs,
  getPaymentProofDetail,
  updateProofStatus,
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

superAdminRouter.get(
  "paymentproof/:id",
  isAuthenticated,
  isAuthorized("Super Admin"),
  getPaymentProofDetail
);
superAdminRouter.put(
  "/paymentproof/status/update/:id",
  isAuthenticated,
  isAuthorized("Super Admin"),
  updateProofStatus
);

superAdminRouter.delete(
  "/paymentproof/delete/:id",
  isAuthenticated,
  isAuthorized("Super Admin"),
  deletePaymentProof
);
export default superAdminRouter;
