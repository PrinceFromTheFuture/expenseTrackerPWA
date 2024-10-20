import axios from "axios";
import { apiURL } from ".";
import { MonthsNames } from "@/types/types";

const HTTPGetBudgetsSpendingsByMonths = async () => {
  const res = await axios.get<{
    success: boolean;
    data: { month: MonthsNames; year: number; data: { budgetId: string; amountInAgorot: number }[] }[];
  }>(`${apiURL}/budgets/getSpendingsByMonths`);
  return res.data;
};

export default HTTPGetBudgetsSpendingsByMonths;
