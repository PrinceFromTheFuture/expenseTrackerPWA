import { db } from "../../../server.js";
import { accountsTable } from "../../../schema.js";
import { and, eq } from "drizzle-orm";
const updateAccount = async (req, res) => {
    const userId = req.userId;
    const accountId = req.params.accountId;
    const { name, balanceInAgorot, iconURL } = req.body;
    if (!name || !balanceInAgorot || !iconURL || !accountId) {
        res.status(400).json({ message: "Not all fields were provided", success: false });
        return;
    }
    await db
        .update(accountsTable)
        .set({ name, balanceInAgorot, iconURL })
        .where(and(eq(accountsTable.id, accountId), eq(accountsTable.userId, userId)));
    res.json({ success: true });
};
export default updateAccount;
