import { db } from "../../../server.js";
import { budgetsTable } from "../../../schema.js";
const getUserBalance = async (req, res) => {
    const AllBudgets = await db.select().from(budgetsTable);
    res.json(AllBudgets);
};
export default getUserBalance;
