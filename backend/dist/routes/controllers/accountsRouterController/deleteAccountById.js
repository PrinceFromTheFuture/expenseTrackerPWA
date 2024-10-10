import { db } from "../../../server.js";
import { accountsTable } from "../../../schema.js";
import { and, eq } from "drizzle-orm";
const deleteAccountById = async (req, res) => {
    const userId = req.userId;
    const accountId = req.params.accountId;
    await db
        .update(accountsTable)
        .set({ isDeleted: true })
        .where(and(eq(accountsTable.id, accountId), eq(accountsTable.userId, userId)));
    res.json({ success: true });
};
export default deleteAccountById;
