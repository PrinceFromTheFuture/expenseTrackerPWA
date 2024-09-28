import * as express from "express";
import controller from "../controllers/authRouterController/index.js";
const authRouter = express.Router();
authRouter.post("/signup", controller.signUp);
authRouter.get("/verifyToken", controller.verifyToken);
export default authRouter;
