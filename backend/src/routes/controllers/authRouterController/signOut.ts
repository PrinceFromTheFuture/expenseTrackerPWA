import { Request, Response } from "express";

const signOut = (req: Request, res: Response) => {
  res.cookie("token", "", { expires: new Date(0), httpOnly: true, secure: true }).json({ success: true });
};

export default signOut;
