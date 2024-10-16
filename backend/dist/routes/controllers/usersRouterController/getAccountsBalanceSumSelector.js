import { db } from "../../../server.js";
import { userTable } from "../../../schema.js";
import { eq } from "drizzle-orm";
const getAccountsBalanceSumSelector = async (req, res) => {
    const userId = req.userId;
    {
        const user = (await db.select().from(userTable).where(eq(userTable.id, userId)))[0];
        res.json({ sucess: true, accountsBalanceSumSelector: user.accountsBalanceSumSelector });
    }
};
export default getAccountsBalanceSumSelector;
