import { Request, Response } from "express";
import { db } from "../../../server.js";
import { accountsTable } from "../../../schema.js";
import { eq } from "drizzle-orm";

const postNewAccount = async (req: Request, res: Response) => {
  const userId = req.userId;

  const { name, balanceInAgorot, iconURL }: { name: string | undefined; balanceInAgorot: number | undefined; iconURL: string | undefined } = req.body;
  console.log(balanceInAgorot);
  if (!name || balanceInAgorot === undefined || !iconURL) {
    res.status(400).json({ message: "Not all fields were provided", success: false });
    return;
  }

  await db.insert(accountsTable).values({ balanceInAgorot, iconURL, name, userId: userId! });

  res.json({ success: true });
};
export default postNewAccount;
