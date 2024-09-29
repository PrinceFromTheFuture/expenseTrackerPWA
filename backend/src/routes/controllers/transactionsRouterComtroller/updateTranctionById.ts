import { Request, Response } from "express";
import { TransactionForm } from "../../../types.js";
import { db } from "../../../server.js";
import { transactionsTable } from "../../../schema.js";
import dayjs from "dayjs";
import { and, eq } from "drizzle-orm";

const updateTransactionById = async (req: Request, res: Response) => {
  const updatedTransaction: TransactionForm = req.body;
  const transactionId = req.params.transactionId;
  const userId = req.userId;

  const success = await db
    .update(transactionsTable)
    .set({
      ...updatedTransaction,
      date: dayjs(updatedTransaction.date).toDate(),
    })
    .where(and(eq(transactionsTable.id, transactionId), eq(transactionsTable.userId, userId!)));
  res.json({ success });
};

export default updateTransactionById;
