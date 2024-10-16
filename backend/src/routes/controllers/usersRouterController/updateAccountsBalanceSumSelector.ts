import { Request, Response } from "express";
import { db } from "../../../server.js";
import { transactionsTable, userTable } from "../../../schema.js";
import { eq } from "drizzle-orm";

const updateAccountsBalanceSumSelector = async (req: Request, res: Response) => {
  const userId = req.userId;
  const newPreferedAccounts = req.body;

  {
    const user = (
      await db
        .update(userTable)
        .set({ accountsBalanceSumSelector: JSON.stringify(newPreferedAccounts) })
        .where(eq(userTable.id, userId!))
        .returning()
    )[0];
    res.json({ sucess: true, accountsBalanceSumSelector: user.accountsBalanceSumSelector as string[] });
  }
};
export default updateAccountsBalanceSumSelector;
