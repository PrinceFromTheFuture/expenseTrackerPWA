import { Request, Response } from "express";
import { db } from "../../../server.js";
import { budgetsTable } from "../../../schema.js";

const getUserBalance = async(req: Request, res: Response) => {
  const AllBudgets = await db.select().from(budgetsTable);
  res.json(AllBudgets);
};

export default getUserBalance;
