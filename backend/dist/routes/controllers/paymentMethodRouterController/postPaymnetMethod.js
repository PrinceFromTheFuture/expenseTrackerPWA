import { db } from "../../../server.js";
import { paymentMethodsTable } from "../../../schema.js";
function checkIfUndefined(objet) {
    for (const key in objet) {
        if (objet[key] === undefined) {
            return true;
        }
    }
    return false;
}
const postPaymnetMethod = async (req, res) => {
    const possibleUndefinedFilledForm = req.body;
    const userId = req.userId;
    if (checkIfUndefined(possibleUndefinedFilledForm)) {
        res.json({ success: false, message: "all filed must be defined" });
        return;
    }
    const filledForm = possibleUndefinedFilledForm;
    const newPaymentMethod = await db.insert(paymentMethodsTable).values({
        name: filledForm.name,
        accountId: filledForm.accountId,
        type: filledForm.type,
        iconURL: filledForm.iconURL,
        userId: userId,
        creditLimit: filledForm.creditLimit,
    });
    console.log(newPaymentMethod);
};
export default postPaymnetMethod;
