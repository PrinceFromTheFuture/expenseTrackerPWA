import { db } from "../../../server.js";
import { transactionsTable } from "../../../schema.js";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
const updateTransactionById = async (req, res) => {
    const updatedTransaction = req.body;
    const transactionId = req.params.transactionId;
    const success = await db
        .update(transactionsTable)
        .set({
        ...updatedTransaction,
        date: dayjs(updatedTransaction.date).toDate(),
    })
        .where(eq(transactionsTable.id, transactionId));
    res.json({ success });
};
export default updateTransactionById;
