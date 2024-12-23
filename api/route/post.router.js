import { Router } from "express";
import {
  createPost,
  getPosts,
  getOnePost,
  updatePost,
  deletePost,
} from "../controller/post.controller.js";
import { verifyToken } from "../middleware/user.middleware.js";

const postRouter = new Router();

postRouter.post("/", verifyToken, createPost);
postRouter.get("/", getPosts);
postRouter.get("/:id", getOnePost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
