import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../../../server.js";
import { userTable } from "../../../schema.js";
import signJWTToken from "../../../utils/signJWTToken.js";
import { eq } from "drizzle-orm";

const signUp = async (req: Request, res: Response) => {
  const { email, password }: { email: string | null; password: string | null } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: "user email is required" });
    return;
  }
  if (!password) {
    res.status(400).json({ success: false, message: "user password is required" });
    return;
  }
  const usersWithTheSameEmail = await db.select().from(userTable).where(eq(userTable.email, email));

  if (usersWithTheSameEmail[0] !== undefined) {
    res.json({ success: false, message: "a user with the same email is already registered" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const savedUser = (await db.insert(userTable).values({ email, balanceInAgorot: 0, hashedPassword, name: "randomUser" }).returning())[0];

  const token = signJWTToken(savedUser);

  res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 10000000 }).json({ success: true, userId: savedUser.id });
  return;
};
export default signUp;
