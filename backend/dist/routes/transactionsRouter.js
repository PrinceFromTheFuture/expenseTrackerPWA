import * as express from "express";
import { db, devUserId } from "../server.js";
import { transactionsTable, userTable } from "../schema.js";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
const transactionsRouter = express.Router();
transactionsRouter.get("/", async (req, res) => {
    const allTransactions = await db.select().from(transactionsTable);
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
    const currentBalanceInAgorot = (await db.select().from(userTable).where(eq(userTable.id, devUserId)))[0]
        .balanceInAgorot;
    const newBalanceInAgorot = currentBalanceInAgorot - savedTransaction.amountInAgorot;
    await db.update(userTable).set({ balanceInAgorot: newBalanceInAgorot }).where(eq(userTable.id, devUserId));
    res.json(savedTransaction);
});
transactionsRouter.delete("/:transactionId", async (req, res) => {
    const transactionId = req.params.transactionId;
    const aboutToBeDeletedTransaction = (await db.select().from(transactionsTable).where(eq(transactionsTable.id, transactionId)))[0];
    const currentBalanceInAgorot = (await db.select().from(userTable).where(eq(userTable.id, devUserId)))[0]
        .balanceInAgorot;
    const newBalanceInAgorot = currentBalanceInAgorot + aboutToBeDeletedTransaction.amountInAgorot;
    await db.update(userTable).set({ balanceInAgorot: newBalanceInAgorot }).where(eq(userTable.id, devUserId));
    const success = await db.delete(transactionsTable).where(eq(transactionsTable.id, transactionId)).execute();
    res.json({ success });
});
transactionsRouter.put("/:transactionId", async (req, res) => {
    const updatedTransaction = req.body;
    const transactionId = req.params.transactionId;
    const success = await db
        .update(transactionsTable)
        .set({
        ...updatedTransaction,
        date: dayjs(updatedTransaction.date).toDate(),
    })
        .where(eq(transactionsTable.id, transactionId));
    res.json({ success });
});
export default transactionsRouter;
