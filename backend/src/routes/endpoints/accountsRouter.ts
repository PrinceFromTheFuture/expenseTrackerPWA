import * as express from "express";
import controller from "../controllers/accountsRouterController/index.js";
import authMiddleware from "../../middleware/authMiddlware.js";

const accountsRouter = express.Router();

accountsRouter.get("/", authMiddleware, controller.getAllAccounts);
accountsRouter.post("/", authMiddleware, controller.postNewAccount);
accountsRouter.put("/:accountId", authMiddleware, controller.updateAccountById);
accountsRouter.delete("/:accountId", authMiddleware, controller.deleteAccountById);

export default accountsRouter;
