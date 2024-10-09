import { transactionsTable, userTable } from "../../../schema.js";
import dayjs from "dayjs";
import { db } from "../../../server.js";
import { eq } from "drizzle-orm";
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
    const currentBalanceInAgorot = (await db.select().from(userTable).where(eq(userTable.id, userId)))[0].balanceInAgorot;
    const newBalanceInAgorot = currentBalanceInAgorot - savedTransaction.amountInAgorot;
    await db.update(userTable).set({ balanceInAgorot: newBalanceInAgorot }).where(eq(userTable.id, userId));
    res.json(savedTransaction);
};
export default postNewTransaction;
