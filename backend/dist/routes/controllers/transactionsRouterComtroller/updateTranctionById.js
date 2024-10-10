import { db } from "../../../server.js";
import { accountsTable, paymentMethodsTable, transactionsTable } from "../../../schema.js";
import dayjs from "dayjs";
import { and, eq } from "drizzle-orm";
const updateTransactionById = async (req, res) => {
    const updatedTransaction = req.body;
    const transactionId = req.params.transactionId;
    const userId = req.userId;
    const currentTransaction = (await db
        .select()
        .from(transactionsTable)
        .where(and(eq(transactionsTable.id, transactionId), eq(transactionsTable.userId, userId))))[0];
    const newTransaction = (await db
        .update(transactionsTable)
        .set({
        ...updatedTransaction,
        date: dayjs(updatedTransaction.date).toDate(),
    })
        .where(and(eq(transactionsTable.id, transactionId), eq(transactionsTable.userId, userId)))
        .returning())[0];
    const paymentMethodAssociatedWithTransaction = (await db
        .select()
        .from(paymentMethodsTable)
        .where(and(eq(paymentMethodsTable.id, currentTransaction.paymentMethodId), eq(paymentMethodsTable.userId, userId))))[0];
    const accountAssociatedWithTransaction = (await db
        .select()
        .from(accountsTable)
        .where(and(eq(accountsTable.id, paymentMethodAssociatedWithTransaction.accountId), eq(accountsTable.userId, userId))))[0];
    await db
        .update(accountsTable)
        .set({ balanceInAgorot: accountAssociatedWithTransaction.balanceInAgorot + currentTransaction.amountInAgorot - newTransaction.amountInAgorot })
        .where(and(eq(accountsTable.id, paymentMethodAssociatedWithTransaction.accountId), eq(accountsTable.userId, userId)))
        .returning();
    res.json({ success: true });
};
export default updateTransactionById;
