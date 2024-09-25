import { Request, Response } from "express";
import { transactionsTable, userTable } from "../../../schema.js";
import dayjs from "dayjs";
import { db, devUserId } from "../../../server.js";
import { TransactionForm } from "../../../types.js";
import { eq } from "drizzle-orm";

const postNewTransaction = async (req: Request, res: Response) => {
  const transactionForm: TransactionForm = req.body;

  const result = await db
    .insert(transactionsTable)
    .values({
      ...transactionForm,
      date: dayjs(transactionForm.date).toDate(),
    })
    .returning();
  const savedTransaction = result[0];

  const currentBalanceInAgorot = (await db.select().from(userTable).where(eq(userTable.id, devUserId)))[0]
    .balanceInAgorot;
  const newBalanceInAgorot = currentBalanceInAgorot - savedTransaction.amountInAgorot;
  await db.update(userTable).set({ balanceInAgorot: newBalanceInAgorot }).where(eq(userTable.id, devUserId));
  res.json(savedTransaction);
};

export default postNewTransaction;
