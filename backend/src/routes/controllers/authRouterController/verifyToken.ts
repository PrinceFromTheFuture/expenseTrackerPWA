import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = async (req: Request, res: Response) => {
  // res.json({ success: true, userId: "fd" });
  //return;
  const token: string | null = req.cookies.token;
  if (!token) {
    res.json({ success: false, message: "token was not provided" });
    return;
  }
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.log("jwt secret was not configured!");
    res.status(400).json({ success: false, message: "server internal erorr" });
    return;
  }
  const decodedToken = jwt.verify(token, jwtSecret) as { userId: string };
  res.json({ success: true, ...decodedToken });
};
export default verifyToken;
