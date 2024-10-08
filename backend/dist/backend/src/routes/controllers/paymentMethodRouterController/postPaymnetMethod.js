import { db } from "../../../server.js";
import { paymentMethodsTable } from "../../../schema.js";
import { eq } from "drizzle-orm";
const postPaymnetMethod = async (req, res) => {
    const data = req.body;
    const fd = { type: "other", accountId: "fd", iconURL: "fe", name: "undefined" };
    function isDataExist(objet) {
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
        const allPaymentMethods = await db.select().from(paymentMethodsTable).where(eq(paymentMethodsTable.userId, userId));
        res.json(allPaymentMethods);
    }
};
export default postPaymnetMethod;
