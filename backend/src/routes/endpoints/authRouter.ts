import * as express from "express";
import controller from "../controllers/authRouterController/index.js";

const authRouter = express.Router();

authRouter.post("/signup", controller.signUp);
authRouter.post("/signIn", controller.signIn);
authRouter.get("/verifyToken", controller.verifyToken);

authRouter.post("/signOut", controller.signOut);

export default authRouter;
