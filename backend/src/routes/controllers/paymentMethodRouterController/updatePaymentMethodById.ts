import { Request, Response } from "express";
import { db } from "../../../server.js";
import { paymentMethodsTable } from "../../../schema.js";
import { and, eq } from "drizzle-orm";
import { PaymentMethod } from "@/types/types.js";

type Nullable<T> = {
  [P in keyof T]: T[P] | undefined;
};

function checkIfUndefined<T>(objet: T): boolean {
  for (const key in objet) {
    if (objet[key] === undefined) {
      return true;
    }
  }
  return false;
}

const updatePaymentMethodById = async (req: Request, res: Response) => {
  const possibleUndefinedFilledForm: Nullable<Omit<PaymentMethod, "id">> = req.body;

  const userId = req.userId;
  const paymentMethodId = req.params.paymentMethodId;

  if (checkIfUndefined(possibleUndefinedFilledForm)) {
    res.json({ success: false, message: "all filed must be defined" });
    return;
  }

  const filledForm = possibleUndefinedFilledForm as PaymentMethod;

await db
    .update(paymentMethodsTable)
    .set({
      name: filledForm.name,
      accountId: filledForm.accountId,
      type: filledForm.type,
      iconURL: filledForm.iconURL,
      color: filledForm.color,
      creditLimit: filledForm.creditLimit,
    })
    .where(and(eq(paymentMethodsTable.id, paymentMethodId), eq(paymentMethodsTable.userId, userId!)));

  res.json({ success: true });
};

export default updatePaymentMethodById;
