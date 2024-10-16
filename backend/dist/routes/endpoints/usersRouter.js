// src/routes/users.ts
import * as express from "express";
import controller from "../controllers/usersRouterController/index.js";
import authMiddleware from "../../middleware/authMiddlware.js";
const usersRouter = express.Router();
usersRouter.get("/accountsBalanceSumSelector", authMiddleware, controller.getAccountsBalanceSumSelector);
usersRouter.put("/accountsBalanceSumSelector", authMiddleware, controller.updateAccountsBalanceSumSelector);
usersRouter.put("/accountsDaysBackChange", authMiddleware, controller.getAccountsDaysBackChange);
export default usersRouter;
