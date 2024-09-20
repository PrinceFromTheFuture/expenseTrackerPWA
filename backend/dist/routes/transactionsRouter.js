import * as express from "express";
import { db } from "../server.js";
import { transactionsTable } from "../schema.js";
import dayjs from "dayjs";
const transactionsRouter = express.Router();
transactionsRouter.get("/", async (req, res) => {
    const allTransactions = await db
        .select()
        .from(transactionsTable);
    res.json(allTransactions);
});
transactionsRouter.post("/", async (req, res) => {
    const transactionForm = req.body;
    await db.insert(transactionsTable).values({
        ...transactionForm,
        date: dayjs(transactionForm.date).toDate(),
    });
});
export default transactionsRouter;
