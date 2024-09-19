import * as express from "express";
import { db } from "../server.js";
import { paymentMethodsTable } from "../schema.js";
const paymentsMethodRouter = express.Router();
paymentsMethodRouter.get("/", async (req, res) => {
    const allPaymentMethods = await db.select().from(paymentMethodsTable);
    res.json(allPaymentMethods);
});
export default paymentsMethodRouter;
