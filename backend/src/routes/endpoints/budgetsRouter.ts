import * as express from "express";
import { budgetsTable, InsertBudgets } from "../../schema.js";
import { db } from "../../server.js";
import controller from "../controllers/budgetsRouterController/index.js";
import authMiddleware from "../../middleware/authMiddlware.js";

const budgetsRouter = express.Router();

budgetsRouter.get("/",authMiddleware, controller.getAllBudgets);

export default budgetsRouter;
