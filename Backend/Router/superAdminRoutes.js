import express from "express";
import {
  deleteAuctionItem,
  deletePaymentProof,
  fetchAllUsers,
  getAllPaymentProofs,
  getPaymentProofDetail,
  monthlyRevenue,
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
superAdminRouter.get(
  "/users/getall",
  isAuthenticated,
  isAuthorized("Super Admin"),
  fetchAllUsers
);

superAdminRouter.get(
  "/monthlyincome",
  isAuthenticated,
  isAuthorized("Super Admin"),
  monthlyRevenue
);

superAdminRouter.get(
  "/paymentproof/:id",
  isAuthenticated,
  isAuthorized("Super Admin"),
  getPaymentProofDetail
);
export default superAdminRouter;
