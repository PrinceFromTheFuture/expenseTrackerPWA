import { Request, Response } from "express";
import { db } from "../../../server.js";
import { accountsTable } from "../../../schema.js";
import { and, eq } from "drizzle-orm";

const updateAccountById = async (req: Request, res: Response) => {
  const userId = req.userId;
  const accountId = req.params.accountId;

  const { name, balanceInAgorot, iconURL }: { name: string | undefined; balanceInAgorot: number | undefined; iconURL: string | undefined } = req.body;

  if (!name || balanceInAgorot === undefined || !iconURL || !accountId) {
    res.status(400).json({ message: "Not all fields were provided", success: false });
    return;
  }

  await db
    .update(accountsTable)
    .set({ name, balanceInAgorot, iconURL })
    .where(and(eq(accountsTable.id, accountId), eq(accountsTable.userId, userId!)));

  res.json({ success: true });
};
export default updateAccountById;
