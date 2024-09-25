import { db } from "../../../server.js";
import { transactionsTable } from "../../../schema.js";
const getAllTransactions = async (req, res) => {
    {
        const allTransactions = await db.select().from(transactionsTable);
        res.json(allTransactions);
    }
};
export default getAllTransactions;
