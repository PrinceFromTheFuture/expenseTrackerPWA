import * as express from "express";
import { db } from "../../server.js";
import { InsertPaymentMethods, paymentMethodsTable } from "../../schema.js";
import { v4 } from "uuid";
import controller from "../controllers/paymentMethodRouterController/index.js";

const paymentsMethodRouter = express.Router();

paymentsMethodRouter.get("/", controller.getAllPaymentMethods );

export default paymentsMethodRouter;
