import * as express from "express";
import controller from "../controllers/transactionsRouterComtroller/index.js";
import authMiddleware from "../../middleware/authMiddlware.js";

const transactionsRouter = express.Router();

transactionsRouter.get("/", authMiddleware, controller.getAllTransactions);

transactionsRouter.post("/", authMiddleware, controller.postNewTransaction);

transactionsRouter.delete("/:transactionId", authMiddleware, controller.deleteTransactionById);

transactionsRouter.put("/:transactionId", authMiddleware, controller.updateTransactionById);

export default transactionsRouter;
