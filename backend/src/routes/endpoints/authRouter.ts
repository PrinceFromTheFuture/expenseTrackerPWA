import * as express from "express";
import { budgetsTable, InsertBudgets } from "../../schema.js";
import { db } from "../../server.js";
import controller from "../controllers/authRouterController/index.js";

const authRouter = express.Router();

authRouter.post("/signup", controller.signUp);
authRouter.post("/signIn", controller.signIn);
authRouter.get("/verifyToken", controller.verifyToken);

export default authRouter;
