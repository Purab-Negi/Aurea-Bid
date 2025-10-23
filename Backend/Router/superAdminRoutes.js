import express from "express";
import { deleteAuctionItem } from "../Controllers/superAdminController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
const superAdminRouter = express.Router();

superAdminRouter.delete(
  "/auctionitem/delete/:id",
  isAuthenticated,
  isAuthorized("Super Admin"),
  deleteAuctionItem
);

export default superAdminRouter;
