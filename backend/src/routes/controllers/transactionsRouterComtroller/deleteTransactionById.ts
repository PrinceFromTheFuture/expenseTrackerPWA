import { Request, Response } from "express";
import { db } from "../../../server.js";
import { accountsTable, paymentMethodsTable, transactionsTable } from "../../../schema.js";
import { and, eq } from "drizzle-orm";

const deleteTransactionById = async (req: Request, res: Response) => {
  const transactionId = req.params.transactionId;

  const userId = req.userId;

  const aboutToBeDeletedTransaction = (
    await db
      .select()
      .from(transactionsTable)
      .where(and(eq(transactionsTable.id, transactionId), eq(transactionsTable.userId, userId!)))
  )[0];

  const paymentMethodAssociatedWithTransaction = (
    await db
      .select()
      .from(paymentMethodsTable)
      .where(and(eq(paymentMethodsTable.id, aboutToBeDeletedTransaction.paymentMethodId!), eq(paymentMethodsTable.userId, userId!)))
  )[0];

  const accountAssociatedWithTransaction = (
    await db
      .select()
      .from(accountsTable)
      .where(and(eq(accountsTable.id, paymentMethodAssociatedWithTransaction.accountId!), eq(accountsTable.userId, userId!)))
  )[0];

  await db
    .update(accountsTable)
    .set({ balanceInAgorot: accountAssociatedWithTransaction.balanceInAgorot + aboutToBeDeletedTransaction.amountInAgorot })
    .where(and(eq(accountsTable.id, paymentMethodAssociatedWithTransaction.accountId!), eq(accountsTable.userId, userId!)))
    .returning();

  await db
    .update(transactionsTable)
    .set({ isDeleted: true })
    .where(and(eq(transactionsTable.id, transactionId), eq(transactionsTable.userId, userId!)));

  res.json({ success: true });
};

export default deleteTransactionById;
