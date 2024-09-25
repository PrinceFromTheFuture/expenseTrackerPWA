import * as express from "express";
import { budgetsTable, InsertBudgets } from "../../schema.js";
import { db } from "../../server.js";
import controller from "../controllers/budgetsRouterController/index.js";

const budgetsRouter = express.Router();

budgetsRouter.get("/", controller.getAllBudgets);

export default budgetsRouter;
