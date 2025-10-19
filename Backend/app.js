import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { connection } from "./Database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./Router/userRoutes.js";
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
connection();
app.use(errorMiddleware);
export default app;
