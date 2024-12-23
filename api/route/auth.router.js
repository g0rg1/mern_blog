import Router from "express";
import { login, registration, logout } from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/user.middleware.js";

const authRouter = new Router();

authRouter.post("/registration", registration);
authRouter.post("/login", login);
authRouter.post("/logout", verifyToken, logout);

export default authRouter;
