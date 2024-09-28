import { db, devUserId } from "../../../server.js";
import { transactionsTable, userTable } from "../../../schema.js";
import { eq } from "drizzle-orm";
const deleteTransactionById = async (req, res) => {
    const transactionId = req.params.transactionId;
    const aboutToBeDeletedTransaction = (await db.select().from(transactionsTable).where(eq(transactionsTable.id, transactionId)))[0];
    const currentBalanceInAgorot = (await db.select().from(userTable).where(eq(userTable.id, devUserId)))[0]
        .balanceInAgorot;
    const newBalanceInAgorot = currentBalanceInAgorot + aboutToBeDeletedTransaction.amountInAgorot;
    await db.update(userTable).set({ balanceInAgorot: newBalanceInAgorot }).where(eq(userTable.id, devUserId));
    const success = await db.delete(transactionsTable).where(eq(transactionsTable.id, transactionId)).execute();
    res.json({ success });
};
export default deleteTransactionById;