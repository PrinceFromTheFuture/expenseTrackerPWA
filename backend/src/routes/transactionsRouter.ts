import * as express from "express";
import { db } from "../server.js";
import { transactionsTable } from "../schema.js";
import { TransactionForm } from "../types.js";
import dayjs from "dayjs";



const transactionsRouter = express.Router();

transactionsRouter.get("/", async (req, res) => {
  const allTransactions = await db
    .select()
    .from(transactionsTable);
  res.json(allTransactions);
});

transactionsRouter.post("/", async (req, res) => {
  const transactionForm: TransactionForm = req.body;

  const result = await db
    .insert(transactionsTable)
    .values({
      ...transactionForm,
      date: dayjs(transactionForm.date).toDate(),
    })
    .returning();
    const savedTransaction = result[0]
  res.json(savedTransaction);
});





export default transactionsRouter;
