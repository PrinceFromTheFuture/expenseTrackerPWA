import * as express from "express";
import controller from "../controllers/paymentMethodRouterController/index.js";
import authMiddleware from "../../middleware/authMiddlware.js";

const paymentsMethodRouter = express.Router();

paymentsMethodRouter.get("/",authMiddleware, controller.getAllPaymentMethods );

export default paymentsMethodRouter;
