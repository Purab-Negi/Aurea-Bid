import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./Database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./Router/userRoutes.js";
import auctionRouter from "./Router/auctionRoutes.js";
import bidRouter from "./Router/bidRoutes.js";
import commissionRouter from "./Router/commissionRoutes.js";
import superAdminRouter from "./Router/superAdminRoutes.js";
const app = express();
config({ path: "./Config/config.env" });
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auction", auctionRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);
connection();
app.use(errorMiddleware);
export default app;
