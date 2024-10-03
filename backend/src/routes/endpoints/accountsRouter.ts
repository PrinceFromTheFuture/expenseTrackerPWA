import * as express from "express";
import controller from "../controllers/accountsRouterController/index.js";
import authMiddleware from "../../middleware/authMiddlware.js";

const accountsRouter = express.Router();

accountsRouter.get("/", authMiddleware, controller.getAllAccounts);

export default accountsRouter;
