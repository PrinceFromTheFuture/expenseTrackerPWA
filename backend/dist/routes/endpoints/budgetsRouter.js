import * as express from "express";
import controller from "../controllers/budgetsRouterController/index.js";
const budgetsRouter = express.Router();
budgetsRouter.get("/", controller.getAllBudgets);
export default budgetsRouter;
