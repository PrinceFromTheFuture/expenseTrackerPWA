import { Request, Response } from "express";
import { db } from "../../../server.js";
import { paymentMethodsTable } from "../../../schema.js";

const getAllPaymentMethods = async (req: Request, res: Response) => {
  {
    const allPaymentMethods = await db.select().from(paymentMethodsTable);
    res.json(allPaymentMethods);
  }
};

export default getAllPaymentMethods;
