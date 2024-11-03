import CircleGraph from "@/features/CircleGraph";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
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
      <div className=" mx-4 justify-between flex items-end mb-4">
        <div className="font-bold text-dark text-lg">Statistics</div>
        <label htmlFor="month123" className=" p-4 rounded-2xl bg-container">
          fd
        </label>
        <input type="month" name="month123" id="month123" className=" absolute " />
      </div>
      <div className=" mx-4  border-container border-2 rounded-2xl flex p-4 justify-center items-center flex-col">
        <div className=" relative">
          <div className=" absolute text-center  bottom-0  left-1/2 -translate-x-1/2">
            <div className="text-secondary mb-1 font-semibold text-base">Budgets view</div>
            <div className="text-dark font-extrabold text-2xl">
              {formatAmountInAgorot(
                budgetsSpendingsByMonth.data.reduce((acc, obj) => acc + obj.amountInAgorot, 0),
                true
              )}
            </div>
          </div>
          {budgetsSpendingsByMonthsStatus === "success" && (
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
        <div className=" flex w-full justify-center items-center mt-4">
          <div className="  flex flex-wrap justify-center gap-2  z-10 max-w-[60%]">
            {" "}
            {budgetsSpendingsByMonth.data.map((budgetObj) => {
              const budget = allBudets.find((budget) => budget.id === budgetObj.budgetId)!;
              return (
                <div key={budget.id} className=" mr-2 flex justify-between items-center gap-2">
                  {" "}
                  <div className=" w-2 h-2 rounded-full  " style={{ backgroundColor: `#${budget.color}` }} />
                  <div className="text-sm    text-secondary font-semibold">{budget.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
