import CircleGraph from "@/features/CircleGraph";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  allBugdetsSelctor,
  getBudgetsSpendingsByMonthsSelector,
  getBudgetsSpendingsByMonthsStatusSelector,
  getBudgetsSpendingsByMonthsThunk,
} from "@/redux/budgetsSlice";
import React, { useEffect, useState } from "react";

const Statistics = () => {
  const budgetsSpendingsByMonths = useAppSelector(getBudgetsSpendingsByMonthsSelector);
  const budgetsSpendingsByMonthsStatus = useAppSelector(getBudgetsSpendingsByMonthsStatusSelector);
  const [budgetsSpendingsByMonth, setBudgetsSpendingsByMonth] = useState(budgetsSpendingsByMonths[0]);
  const allBudets = useAppSelector(allBugdetsSelctor);
 

  return (
    <div className=" w-full fixed  top-0 bottom-0 left-0 right-0 overflow-y-auto overflow-x-hidden bg-surface py-4">
      <div className="font-bold text-dark text-lg">Statistics</div>
      <div className=" mx-4  border-container border-2 rounded-2xl flex p-4 justify-center items-center flex-col">
        {budgetsSpendingsByMonthsStatus === 'success' && (
          <CircleGraph
            data={budgetsSpendingsByMonth.data.map((budgetSpendings) => {
              return {
                amount: budgetSpendings.amountInAgorot / 100,
                color: `#${allBudets.find((budegt) => budegt.id === budgetSpendings.budgetId)!.color}`,
                id: budgetSpendings.budgetId,
              };
            })}
            roundness={8}
            segmentBorderWidth={5}
            segmentWidth={30}
            size={200}
          />
        )}
      </div>
    </div>
  );
};

export default Statistics;
