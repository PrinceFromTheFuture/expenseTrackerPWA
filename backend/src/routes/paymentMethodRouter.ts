import * as express from "express";
import { db } from "../server.js";
import { InsertPaymentMethods, paymentMethodsTable } from "../schema.js";
import { v4 } from "uuid";

const paymentsMethodRouter = express.Router();

paymentsMethodRouter.get("/",async (req, res) => {

    const allPaymentMethods =await db.select().from(paymentMethodsTable)
    res.json(allPaymentMethods);
  });

export default paymentsMethodRouter;
