import { Request, Response } from "express";
import { db } from "../../../server.js";
import { paymentMethodsTable } from "../../../schema.js";
import { eq } from "drizzle-orm";

const getAllPaymentMethods = async (req: Request, res: Response) => {
  const userId = req.userId;
  {
    const allPaymentMethods = await db.select().from(paymentMethodsTable).where(eq(paymentMethodsTable.userId, userId!));
    res.json(allPaymentMethods);
  }
};

export default getAllPaymentMethods;
