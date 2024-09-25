import * as express from "express";
import controller from "../controllers/transactionsRouterComtroller/index.js";
const transactionsRouter = express.Router();
transactionsRouter.get("/", controller.getAllTransactions);
transactionsRouter.post("/", controller.postNewTransaction);
transactionsRouter.delete("/:transactionId", controller.deleteTransactionById);
transactionsRouter.put("/:transactionId", controller.updateTransactionById);
export default transactionsRouter;
