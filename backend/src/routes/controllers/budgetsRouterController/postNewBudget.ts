import { Request, Response } from "express";
import { db } from "../../../server.js";
import { budgetsTable } from "../../../schema.js";

const postNewBudget = async (req: Request, res: Response) => {
  const userId = req.userId;
  const budget: { name: string; color: string; iconURL: string } = req.body;
  const { color, iconURL, id, name } = (
    await db
      .insert(budgetsTable)
      .values({ ...budget, userId: userId! })
      .returning()
  )[0];
  res.json({ success: true, budget: { color, iconURL, id, name } });
};

export default postNewBudget;
