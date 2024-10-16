import { Request, Response } from "express";
import { db } from "../../../server.js";
import { transactionsTable, userTable } from "../../../schema.js";
import { eq } from "drizzle-orm";

const getAccountsDaysBackChanges = async (req: Request, res: Response) => {
  const userId = req.userId;

  {
    const user = (await db.select().from(userTable).where(eq(userTable.id, userId!)))[0];
    res.json({success:true,accountsDaysBackChange:user.accountsDaysBackChange});
  }
};

export default getAccountsDaysBackChanges;
