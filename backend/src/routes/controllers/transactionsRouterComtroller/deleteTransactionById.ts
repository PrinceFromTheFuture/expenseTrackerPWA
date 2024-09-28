import { Request, Response } from "express";
import { db, devUserId } from "../../../server.js";
import { transactionsTable, userTable } from "../../../schema.js";
import { and, eq } from "drizzle-orm";

const deleteTransactionById = async (req: Request, res: Response) => {
  const transactionId = req.params.transactionId;

  const userId = req.userId;

  const aboutToBeDeletedTransaction = (
    await db.select().from(transactionsTable).where(eq(transactionsTable.id, transactionId))
  )[0];

  const currentBalanceInAgorot = (await db.select().from(userTable).where(eq(userTable.id, userId!)))[0]
    .balanceInAgorot;

  const newBalanceInAgorot = currentBalanceInAgorot + aboutToBeDeletedTransaction.amountInAgorot;
  await db.update(userTable).set({ balanceInAgorot: newBalanceInAgorot }).where(eq(userTable.id, userId!));

  const success = await db
    .delete(transactionsTable)
    .where(and(eq(transactionsTable.id, transactionId), eq(transactionsTable.userId, userId!)))
    .execute();

  res.json({ success });
};

export default deleteTransactionById;
