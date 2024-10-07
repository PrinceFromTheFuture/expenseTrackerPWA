import { db } from "../../../server.js";
import { budgetsTable } from "../../../schema.js";
const postNewBudget = async (req, res) => {
    const userId = req.userId;
    const budget = req.body;
    const { color, iconURL, id, name } = (await db
        .insert(budgetsTable)
        .values({ ...budget, userId: userId })
        .returning())[0];
    res.json({ success: true, budget: { color, iconURL, id, name } });
};
export default postNewBudget;
