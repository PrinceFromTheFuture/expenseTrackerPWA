import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.log("jwt secret is not defined!");
    return;
  }
  const token: string | undefined = req.cookies.token;
  if (!token) {
    res.json({ success: false, messages: "access denied acess token must be provided" });
    return;
  }
  const decodedToken = jwt.verify(token, jwtSecret) as { userId: string };
  req.userId = decodedToken.userId;
  next();
};

export default authMiddleware;
