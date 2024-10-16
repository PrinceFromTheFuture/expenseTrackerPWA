import { db } from "../../../server.js";
import { userTable } from "../../../schema.js";
import { eq } from "drizzle-orm";
const updateAccountsBalanceSumSelector = async (req, res) => {
    const userId = req.userId;
    const newPreferedAccounts = req.body;
    {
        const user = (await db
            .update(userTable)
            .set({ accountsBalanceSumSelector: JSON.stringify(newPreferedAccounts) })
            .where(eq(userTable.id, userId))
            .returning())[0];
        res.json({ sucess: true, accountsBalanceSumSelector: user.accountsBalanceSumSelector });
    }
};
export default updateAccountsBalanceSumSelector;
