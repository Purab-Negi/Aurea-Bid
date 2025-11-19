import express from "express";
import {
  fetchLeaderboard,
  forgotPassword,
  getProfile,
  login,
  logout,
  register,
  resetPassword,
  verifyOtp,
} from "../Controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/me", isAuthenticated, getProfile);
userRouter.get("/logout", isAuthenticated, logout);
userRouter.get("/leaderboard", fetchLeaderboard);
userRouter.post("/password/forgot", forgotPassword);
userRouter.post("/password/verify-password", verifyOtp);
userRouter.post("/password/reset", resetPassword);
export default userRouter;
