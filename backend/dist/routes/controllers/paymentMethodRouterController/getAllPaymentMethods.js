import { db } from "../../../server.js";
import { paymentMethodsTable } from "../../../schema.js";
const getAllPaymentMethods = async (req, res) => {
    {
        const allPaymentMethods = await db.select().from(paymentMethodsTable);
        res.json(allPaymentMethods);
    }
};
export default getAllPaymentMethods;
