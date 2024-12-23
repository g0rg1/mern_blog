import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./route/auth.router.js";
import postRouter from "./route/post.router.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use("/auth", authRouter);
app.use("/post", postRouter);
async function startApp() {
  try {
    await mongoose.connect(process.env.LINK);

    app.listen(process.env.PORT, () => {
      console.log(
        `Server started on port ${process.env.PORT} , Mongo connection:OK`
      );
    });
  } catch (e) {
    console.error(e);
  }
}

startApp();
