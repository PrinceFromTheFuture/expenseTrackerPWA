import { User } from "../types.js";
import jwt from "jsonwebtoken";

const signJWTToken = (user: User) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.log("jwt secret is not defined!");
    return;
  }
  const token = jwt.sign({ userId: user.id }, jwtSecret, {
    expiresIn: "7d",
  });
  return token;
};

export default signJWTToken;