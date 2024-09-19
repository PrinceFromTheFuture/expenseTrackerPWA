import * as express from "express";
import { db } from "../server.js";
import { transactionsTable } from "../schema.js";
import { v4 as uuidv4 } from "uuid";
const transactionsRouter = express.Router();
transactionsRouter.get("/", (req, res) => {
    const getAllTransactions = async () => {
        return await db.select().from(transactionsTable);
    };
    const allTransactions = getAllTransactions();
    res.json(allTransactions);
});
transactionsRouter.get("/new", (req, res) => {
    const getAllTransactions = async () => {
        return await db.insert(transactionsTable).values({
            amountInAgorot: 43,
            date: new Date(Date.now()),
            description: "3242fg",
            title: "fsdf",
            budgetId: uuidv4(),
            paymentMethodId: uuidv4(),
        });
    };
    getAllTransactions();
    res.send("fd");
});
export default transactionsRouter;
