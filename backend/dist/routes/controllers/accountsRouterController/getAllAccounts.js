import { db } from "../../../server.js";
import { accountsTable } from "../../../schema.js";
import { eq } from "drizzle-orm";
const getAllAccounts = async (req, res) => {
    const userId = req.userId;
    const allAccounts = await db.select().from(accountsTable).where(eq(accountsTable.userId, userId));
    res.json(allAccounts);
};
export default getAllAccounts;
