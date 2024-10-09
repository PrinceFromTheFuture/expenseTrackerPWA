import { Request, Response } from "express";
import { db } from "../../../server.js";
import { paymentMethodsTable, transactionsTable, userTable } from "../../../schema.js";
import { and, eq } from "drizzle-orm";

const deletePaymentMethodById = async (req: Request, res: Response) => {
  const paymentMethodId = req.params.paymentMethodId;

  const userId = req.userId;


 await db
    .delete(paymentMethodsTable)
    .where(and(eq(paymentMethodsTable.id, paymentMethodId), eq(paymentMethodsTable.userId, userId!)))
    .execute();

  res.json({ sucess:true });
};

export default deletePaymentMethodById;
