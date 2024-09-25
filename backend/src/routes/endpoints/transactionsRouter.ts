import * as express from "express";
import { db, devUserId } from "../../server.js";
import { transactionsTable, userTable } from "../../schema.js";
import { TransactionForm } from "../../types.js";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import controller from "../controllers/transactionsRouterComtroller/index.js";

const transactionsRouter = express.Router();

transactionsRouter.get("/", controller.getAllTransactions);

transactionsRouter.post("/", controller.postNewTransaction);

transactionsRouter.delete("/:transactionId", controller.deleteTransactionById);

transactionsRouter.put("/:transactionId", controller.updateTransactionById);

export default transactionsRouter;
