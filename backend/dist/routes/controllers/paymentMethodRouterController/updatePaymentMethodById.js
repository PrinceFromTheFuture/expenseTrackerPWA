import { db } from "../../../server.js";
import { paymentMethodsTable } from "../../../schema.js";
import { and, eq } from "drizzle-orm";
function checkIfUndefined(objet) {
    for (const key in objet) {
        if (objet[key] === undefined) {
            return true;
        }
    }
    return false;
}
const updatePaymentMethodById = async (req, res) => {
    const possibleUndefinedFilledForm = req.body;
    const userId = req.userId;
    const paymentMethodId = req.params.paymentMethodId;
    if (checkIfUndefined(possibleUndefinedFilledForm)) {
        res.json({ success: false, message: "all filed must be defined" });
        return;
    }
    const filledForm = possibleUndefinedFilledForm;
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
        .where(and(eq(paymentMethodsTable.id, paymentMethodId), eq(paymentMethodsTable.userId, userId)));
    res.json({ success: true });
};
export default updatePaymentMethodById;
