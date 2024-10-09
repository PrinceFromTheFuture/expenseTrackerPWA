import * as express from "express";
import controller from "../controllers/paymentMethodRouterController/index.js";
import authMiddleware from "../../middleware/authMiddlware.js";
const paymentsMethodRouter = express.Router();
paymentsMethodRouter.get("/", authMiddleware, controller.getAllPaymentMethods);
paymentsMethodRouter.post("/", authMiddleware, controller.postNewPaymnetMethod);
paymentsMethodRouter.put("/:paymentMethodId", authMiddleware, controller.updatePaymentMethodById);
export default paymentsMethodRouter;
