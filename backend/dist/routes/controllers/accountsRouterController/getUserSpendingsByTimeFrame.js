import { transactionsTable } from "../../../schema.js";
import { and, between, eq } from "drizzle-orm";
import dayjs from "dayjs";
import { db } from "../../../server.js";
const getUserSpendingsByTimeFrame = async (req, res) => {
    const userId = req.userId;
    const requestedTimeFrame = req.body;
    const transactionOccueredInTimeFrame = await db
        .select()
        .from(transactionsTable)
        .where(and(between(transactionsTable.date, dayjs(requestedTimeFrame.from).toDate(), dayjs(requestedTimeFrame.to).toDate()), eq(transactionsTable.userId, userId), eq(transactionsTable.isDeleted, false)));
    const spendingsInTimeFrame = transactionOccueredInTimeFrame.reduce((accumulator, transaction) => {
        return accumulator + transaction.amountInAgorot;
    }, 0);
    res.json({ amountInAgorot: spendingsInTimeFrame });
};
export default getUserSpendingsByTimeFrame;
