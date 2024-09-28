// src/routes/users.ts

import * as express from "express";
import controller from "../controllers/usersRouterController/index.js";
import authMiddleware from "../../middleware/authMiddlware.js";

const usersRouter = express.Router();

usersRouter.post("/timeFrameSpendings", authMiddleware, controller.getUserSpendingsByTimeFrame);

usersRouter.get("/balance", authMiddleware, controller.getUserBalance);

export default usersRouter;
