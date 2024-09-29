import { db } from "../../../server.js";
import { transactionsTable } from "../../../schema.js";
import { eq } from "drizzle-orm";
const getAllTransactions = async (req, res) => {
    const userId = req.userId;
    {
        const allTransactions = await db.select().from(transactionsTable).where(eq(transactionsTable.userId, userId));
        res.json(allTransactions);
    }
};
export default getAllTransactions;
