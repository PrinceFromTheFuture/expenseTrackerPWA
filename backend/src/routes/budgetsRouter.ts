import * as express from "express";
import { budgetsTable, InsertBudgets } from "../schema.js";
import { db } from "../server.js";

const budgetsRouter = express.Router();

budgetsRouter.get("/", async (req, res) => {
  const AllBudgets = await db.select().from(budgetsTable);
  res.json(AllBudgets);
});
export default budgetsRouter;
