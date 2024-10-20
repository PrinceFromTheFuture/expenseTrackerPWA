import { db } from "../../../server.js";
import { budgetsTable, transactionsTable } from "../../../schema.js";
import { and, eq } from "drizzle-orm";
import dayjs from "dayjs";
const getUserBalance = async (req, res) => {
    const userId = req.userId;
    const allBudgets = await db
        .select()
        .from(budgetsTable)
        .where(and(eq(budgetsTable.userId, userId), eq(budgetsTable.isDeleted, false)));
    const allTransactions = await db
        .select()
        .from(transactionsTable)
        .where(and(eq(transactionsTable.userId, userId), eq(transactionsTable.isDeleted, false)));
    const monthsAgo = 12;
    let data = [];
    for (let i = 0; i < monthsAgo; i++) {
        const maxDate = dayjs()
            .subtract(i - 1, "months")
            .set("date", 1)
            .set("hour", 0)
            .set("minute", 0);
        const minDate = dayjs().subtract(i, "months").set("date", 1).set("hour", 0).set("minute", 0);
        const allTransactionsMadeInTimeFrame = allTransactions.filter((transaction) => {
            const dateObject = dayjs(transaction.date);
            if (dateObject.isAfter(minDate) && dateObject.isBefore(maxDate)) {
                return true;
            }
            else {
                return false;
            }
        });
        const amountSpentInBudgetAtTimeFrame = allBudgets.map((budget) => {
            const transactionsInBudget = allTransactionsMadeInTimeFrame.filter((transction) => transction.budgetId === budget.id);
            const amountSpent = transactionsInBudget.reduce((acc, obj) => acc + obj.amountInAgorot, 0);
            return { budgetId: budget.id, amountInAgorot: amountSpent };
        });
        data.push({
            month: minDate.get("month"),
            year: minDate.get("year"),
            data: amountSpentInBudgetAtTimeFrame,
        });
    }
    res.json({ success: true, data });
};
export default getUserBalance;
