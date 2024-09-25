// src/routes/users.ts

import * as express from "express";
import controller from "../controllers/usersRouterController/index.js";

const usersRouter = express.Router();

usersRouter.post("/timeFrameSpendings", controller.getUserSpendingsByTimeFrame);

usersRouter.get("/balance", controller.getUserBalance);

export default usersRouter;
