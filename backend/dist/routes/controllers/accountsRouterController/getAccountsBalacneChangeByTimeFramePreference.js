import { db } from "../../../server.js";
import { accountsTable, transactionsTable } from "../../../schema.js";
import { eq } from "drizzle-orm";
const getAccountsBalacneChangeByTimeFramePreference = async (req, res) => {
    const userId = req.userId;
    const allAccounts = await db.select().from(accountsTable).where(eq(accountsTable.userId, userId));
    const allTransactions = await db.select().from(transactionsTable).where(eq(transactionsTable.userId, userId));
    res.json(allAccounts);
};
export default getAccountsBalacneChangeByTimeFramePreference;
