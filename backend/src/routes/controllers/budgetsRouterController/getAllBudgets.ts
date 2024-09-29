import { Request, Response } from "express";
import { db } from "../../../server.js";
import { budgetsTable } from "../../../schema.js";
import { eq } from "drizzle-orm";

const getUserBalance = async (req: Request, res: Response) => {
  const userId = req.userId;
  const AllBudgets = await db.select().from(budgetsTable).where(eq(budgetsTable.userId, userId!));
  res.json(AllBudgets);
};

export default getUserBalance;
