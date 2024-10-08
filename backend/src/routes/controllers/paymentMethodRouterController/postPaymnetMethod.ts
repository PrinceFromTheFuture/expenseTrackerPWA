import { Request, Response } from "express";
import { db } from "../../../server.js";
import { paymentMethodsTable } from "../../../schema.js";
import { eq } from "drizzle-orm";
import { OtherPayemntMethodData, CreditCardPayemntMethodData, DebitCardPayemntMethodData } from "@/types/PaymentMethod.js";
type Nullable<T> = {
  [P in keyof T]: T[P] | undefined;
};

type Body = Nullable<OtherPayemntMethodData> | Nullable<CreditCardPayemntMethodData> | Nullable<DebitCardPayemntMethodData>;
const postPaymnetMethod = async (req: Request, res: Response) => {
  const data: Body = req.body;
  const fd: Body = { type: "other", accountId: "fd", iconURL: "fe", name: "undefined" };
  function isDataExist<T>(objet: T): boolean {
    for (const key in objet) {
      if (objet[key] === undefined) {
        return false;
      }
    }
    return true;
  }
  const test = isDataExist(fd);

  const userId = req.userId;
  {
    const allPaymentMethods = await db.select().from(paymentMethodsTable).where(eq(paymentMethodsTable.userId, userId!));
    res.json(allPaymentMethods);
  }
};

export default postPaymnetMethod;
