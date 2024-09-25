import * as express from "express";
import controller from "../controllers/paymentMethodRouterController/index.js";
const paymentsMethodRouter = express.Router();
paymentsMethodRouter.get("/", controller.getAllPaymentMethods);
export default paymentsMethodRouter;
