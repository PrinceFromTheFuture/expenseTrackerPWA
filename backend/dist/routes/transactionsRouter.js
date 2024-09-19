import * as express from "express";
import { db } from "../server.js";
import { transactionsTable } from "../schema.js";
const transactionsRouter = express.Router();
transactionsRouter.get("/", async (req, res) => {
    const allTransactions = await db.select().from(transactionsTable);
    res.json(allTransactions);
});
transactionsRouter.get("/new", (req, res) => {
    const getAllTransactions = async () => {
        return await db.insert(transactionsTable).values({
            amountInAgorot: 43,
            date: new Date(Date.now()),
            description: "3242fg",
            title: "fsdf",
            budgetId: "eb4e8781-fa1e-463d-944c-8e7198cbfeff",
            paymentMethodId: "e102eafb-29b7-40fc-8b53-44408ab2cf66",
        });
    };
    getAllTransactions();
    res.send("fd");
});
export default transactionsRouter;
