// src/routes/users.ts
import * as express from "express";
import { db } from "../server.js";
import { transactionsTable, userTable } from "../schema.js";
import { between, eq } from "drizzle-orm";
import dayjs from "dayjs";
const usersRouter = express.Router();
usersRouter.post("/timeFrameSpendings", async (req, res) => {
    const requestedTimeFrame = req.body;
    const transactionOccueredInTimeFrame = await db
        .select()
        .from(transactionsTable)
        .where(between(transactionsTable.date, dayjs(requestedTimeFrame.from).toDate(), dayjs(requestedTimeFrame.to).toDate()));
    const spendingsInTimeFrame = transactionOccueredInTimeFrame.reduce((accumulator, transaction) => {
        return accumulator + transaction.amountInAgorot;
    }, 0);
    res.json({ amountInAgorot: spendingsInTimeFrame });
});
usersRouter.get("/balance", async (req, res) => {
    // only for my self route need to change
    const amirUserId = "cfad1132-6e09-45b0-ac52-f72735057c3f";
    const result = await db.select().from(userTable).where(eq(userTable.id, amirUserId));
    const user = result[0];
    res.json({ balanceInAgorot: user.balanceInAgorot });
});
export default usersRouter;
