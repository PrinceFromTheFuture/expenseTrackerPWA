// src/routes/users.ts
import * as express from "express";
import { db } from "../server.js";
import { transactionsTable, userTable, } from "../schema.js";
import { between, eq } from "drizzle-orm";
import dayjs from "dayjs";
import userId from "../devUser.js";
const usersRouter = express.Router();
usersRouter.post("/timeFrameSpendings", async (req, res) => {
    const requestedTimeFrame = req.body;
    const transactionOccueredInTimeFrame = await db
        .select()
        .from(transactionsTable)
        .where(between(transactionsTable.date, dayjs(requestedTimeFrame.from).toDate(), dayjs(requestedTimeFrame.to).toDate()));
    const spendingsInTimeFrame = transactionOccueredInTimeFrame.reduce((accumulator, transaction) => {
        return (accumulator + transaction.amountInAgorot);
    }, 0);
    res.json({ amountInAgorot: spendingsInTimeFrame });
});
usersRouter.get("/balance", async (req, res) => {
    // only for my self route need to change
    const result = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, userId));
    const user = result[0];
    res.json({ balanceInAgorot: user.balanceInAgorot });
});
export default usersRouter;
