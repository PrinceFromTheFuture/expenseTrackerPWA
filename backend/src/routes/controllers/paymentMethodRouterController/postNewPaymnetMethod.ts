import { Request, Response } from "express";
import { db } from "../../../server.js";
import { paymentMethodsTable } from "../../../schema.js";
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

const postNewPaymnetMethod = async (req: Request, res: Response) => {
  const possibleUndefinedFilledForm: Nullable<Omit<PaymentMethod, "id">> = req.body;

  const userId = req.userId;

  if (checkIfUndefined(possibleUndefinedFilledForm)) {
    res.json({ success: false, message: "all filed must be defined" });
    return;
  }

  const filledForm = possibleUndefinedFilledForm as PaymentMethod;
  try {
    await db.insert(paymentMethodsTable).values({
      name: filledForm.name,
      accountId: filledForm.accountId,
      type: filledForm.type,
      iconURL: filledForm.iconURL,
      color: filledForm.color,
      userId: userId!,
      creditLimit: filledForm.creditLimit,
      resetDate: filledForm.resetDate
    }).returning();
    console.log(filledForm);
  } catch (e) {
    console.log(e);
  }
  res.json({ success: true });
};

export default postNewPaymnetMethod;
