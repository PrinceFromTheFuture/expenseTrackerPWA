import { Request, Response } from "express";
import { db } from "../../../server.js";
import { accountsTable } from "../../../schema.js";
import { and, eq } from "drizzle-orm";

const deleteAccountById = async (req: Request, res: Response) => {
  const userId = req.userId;
  const accountId = req.params.accountId;

  await db.delete(accountsTable).where(and(eq(accountsTable.id, accountId), eq(accountsTable.userId, userId!)));
  res.json({ success: true });
};
export default deleteAccountById;
