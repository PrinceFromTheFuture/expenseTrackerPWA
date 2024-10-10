import { accountsTable, paymentMethodsTable, transactionsTable } from "../../../schema.js";
import dayjs from "dayjs";
import { db } from "../../../server.js";
import { and, eq } from "drizzle-orm";
const postNewTransaction = async (req, res) => {
    const transactionForm = req.body;
    const userId = req.userId;
    const result = await db
        .insert(transactionsTable)
        .values({
        ...transactionForm,
        userId: userId,
        date: dayjs(transactionForm.date).toDate(),
    })
        .returning();
    const savedTransaction = result[0];
    const paymentMethodAssociatedWithTransaction = (await db
        .select()
        .from(paymentMethodsTable)
        .where(and(eq(paymentMethodsTable.id, transactionForm.paymentMethodId), eq(paymentMethodsTable.userId, userId))))[0];
    const accountAssociatedWithTransaction = (await db
        .select()
        .from(accountsTable)
        .where(and(eq(accountsTable.id, paymentMethodAssociatedWithTransaction.accountId), eq(accountsTable.userId, userId))))[0];
    await db
        .update(accountsTable)
        .set({ balanceInAgorot: accountAssociatedWithTransaction.balanceInAgorot - savedTransaction.amountInAgorot })
        .where(and(eq(accountsTable.id, paymentMethodAssociatedWithTransaction.accountId), eq(accountsTable.userId, userId)))
        .returning();
    res.json(savedTransaction);
};
export default postNewTransaction;
