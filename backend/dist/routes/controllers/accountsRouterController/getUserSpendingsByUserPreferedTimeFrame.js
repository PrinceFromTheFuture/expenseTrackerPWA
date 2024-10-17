import { accountsTable, paymentMethodsTable, transactionsTable, userTable } from "../../../schema.js";
import { and, between, eq } from "drizzle-orm";
import dayjs from "dayjs";
import { db } from "../../../server.js";
const getUserSpendingsByUserPreferedTimeFrame = async (req, res) => {
    const userId = req.userId;
    const userPreferedDaysAgo = (await db.select().from(userTable).where(eq(userTable.id, userId)))[0].accountsDaysBackChange;
    const requestedTimeFrame = { from: dayjs().subtract(userPreferedDaysAgo, "days").toISOString(), to: dayjs().toISOString() };
    const transactionOccueredInTimeFrame = await db
        .select()
        .from(transactionsTable)
        .where(and(between(transactionsTable.date, dayjs(requestedTimeFrame.from).toDate(), dayjs(requestedTimeFrame.to).toDate()), eq(transactionsTable.userId, userId), eq(transactionsTable.isDeleted, false)));
    const allAccounts = await db
        .select()
        .from(accountsTable)
        .where(and(eq(accountsTable.userId, userId), eq(accountsTable.userId, userId), eq(accountsTable.isDeleted, false)));
    const allPaymentMethods = await db
        .select()
        .from(paymentMethodsTable)
        .where(and(eq(paymentMethodsTable.userId, userId), eq(paymentMethodsTable.userId, userId), eq(paymentMethodsTable.isDeleted, false)));
    const data = allAccounts.map((account) => {
        const paymentMethodUsedId = allPaymentMethods.find((paymentMethod) => paymentMethod.accountId == account.id)?.id;
        if (!paymentMethodUsedId) {
            return { accountId: account.id, amountInAgorotUsedInTimeFrame: 0 };
        }
        const transactionsAccosiatedWithAccount = transactionOccueredInTimeFrame.filter((trnasction) => trnasction.paymentMethodId == paymentMethodUsedId);
        const amountUsedInTimeFrame = transactionsAccosiatedWithAccount.reduce((accumulator, transaction) => {
            return accumulator + transaction.amountInAgorot;
        }, 0);
        return { accountId: account.id, amountInAgorotUsedInTimeFrame: amountUsedInTimeFrame };
    });
    res.json({ sucess: true, data: data });
};
export default getUserSpendingsByUserPreferedTimeFrame;
