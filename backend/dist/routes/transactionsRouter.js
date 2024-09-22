import * as express from "express";
import { db } from "../server.js";
import { transactionsTable, userTable, } from "../schema.js";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import userId from "./devUser.js";
const transactionsRouter = express.Router();
transactionsRouter.get("/", async (req, res) => {
    const allTransactions = await db
        .select()
        .from(transactionsTable);
    res.json(allTransactions);
});
transactionsRouter.post("/", async (req, res) => {
    const transactionForm = req.body;
    const result = await db
        .insert(transactionsTable)
        .values({
        ...transactionForm,
        date: dayjs(transactionForm.date).toDate(),
    })
        .returning();
    const savedTransaction = result[0];
    const currentBalanceInAgorot = (await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, userId)))[0].balanceInAgorot;
    const newBalanceInAgorot = currentBalanceInAgorot -
        savedTransaction.amountInAgorot;
    await db
        .update(userTable)
        .set({ balanceInAgorot: newBalanceInAgorot })
        .where(eq(userTable.id, userId));
    res.json(savedTransaction);
});
export default transactionsRouter;
