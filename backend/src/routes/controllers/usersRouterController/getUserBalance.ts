import { Request, Response } from "express";
import { db } from "../../../server.js";
import { userTable } from "../../../schema.js";
import { eq } from "drizzle-orm";

const getUserBalance = async (req: Request, res: Response) => {
  // only for my self route need to change

  const userId = req.userId;

  const result = await db.select().from(userTable).where(eq(userTable.id, userId!));
  const user = result[0];

  res.json({ balanceInAgorot: user.balanceInAgorot });
};

export default getUserBalance;
