import { Request, Response } from "express";
import { accountsTable, paymentMethodsTable, transactionsTable } from "../../../schema.js";
import { and, between, eq } from "drizzle-orm";
import dayjs from "dayjs";
import { db } from "../../../server.js";

const getUserSpendingsByTimeFrame = async (req: Request, res: Response) => {
  const userId = req.userId;
  const requestedTimeFrame: {
    from: string;
    to: string;
  } = req.body;

  const transactionOccueredInTimeFrame = await db
    .select()
    .from(transactionsTable)
    .where(
      and(
        between(transactionsTable.date, dayjs(requestedTimeFrame.from).toDate(), dayjs(requestedTimeFrame.to).toDate()),
        eq(transactionsTable.userId, userId!),
        eq(transactionsTable.isDeleted, false)
      )
    );
  const allAccounts = await db
    .select()
    .from(accountsTable)
    .where(and(eq(accountsTable.userId, userId!), eq(accountsTable.userId, userId!), eq(accountsTable.isDeleted, false)));

  const allPaymentMethods = await db
    .select()
    .from(paymentMethodsTable)
    .where(and(eq(paymentMethodsTable.userId, userId!), eq(paymentMethodsTable.userId, userId!), eq(paymentMethodsTable.isDeleted, false)));

  const data = allAccounts.map((account) => {
    const paymentMethodUsedId = allPaymentMethods.find((paymentMethod) => paymentMethod.accountId == account.id)?.id;

    if (!paymentMethodUsedId) {
      return { accountId: account.id, amountInAgorotUsedInTimeFrame: 0 };
    }

    const transactionsAccosiatedWithAccount = transactionOccueredInTimeFrame.filter(
      (trnasction) => trnasction.paymentMethodId == paymentMethodUsedId
    );

    const amountUsedInTimeFrame = transactionsAccosiatedWithAccount.reduce((accumulator, transaction) => {
      return accumulator + transaction.amountInAgorot;
    }, 0);
    return { accountId: account.id, amountInAgorotUsedInTimeFrame: amountUsedInTimeFrame };
  });
  res.json({ sucess: true, data: data });
};
export default getUserSpendingsByTimeFrame;
