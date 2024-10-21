import CircleGraph from "@/features/CircleGraph";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import generalTransition from "@/lib/generalTransition";
import {
  allBugdetsSelctor,
  getBudgetsSpendingsByMonthsSelector,
  getBudgetsSpendingsByMonthsStatusSelector,
  getBudgetsSpendingsByMonthsThunk,
} from "@/redux/budgetsSlice";
import React, { useEffect, useState } from "react";
import caret_secondary from "@/assets/caret_secondary.svg";
import { motion } from "framer-motion";
import Touchable from "@/components/Touchable";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from "@/components/alert-dialog";
import exit_main from "@/assets/exit_main.svg";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";

const Statistics = () => {
  const budgetsSpendingsByMonths = useAppSelector(getBudgetsSpendingsByMonthsSelector);
  const budgetsSpendingsByMonthsStatus = useAppSelector(getBudgetsSpendingsByMonthsStatusSelector);
  const [budgetsSpendingsByMonth, setBudgetsSpendingsByMonth] = useState(budgetsSpendingsByMonths[0]);
  const allBudets = useAppSelector(allBugdetsSelctor);

  const [fromatedData, setFormatedData] = useState(
    budgetsSpendingsByMonth.data.map((budgetSpendings) => {
      return {
        amount: budgetSpendings.amountInAgorot / 100,
        color: `#${allBudets.find((budegt) => budegt.id === budgetSpendings.budgetId)!.color}`,
        id: budgetSpendings.budgetId,
      };
    })
  );
  useEffect(() => {
    if (budgetsSpendingsByMonth.data.filter((budget) => budget.amountInAgorot !== 0).length > 1) {
      setFormatedData(
        budgetsSpendingsByMonth.data.map((budgetSpendings) => {
          return {
            amount: budgetSpendings.amountInAgorot / 100,
            color: `#${allBudets.find((budegt) => budegt.id === budgetSpendings.budgetId)!.color}`,
            id: budgetSpendings.budgetId,
          };
        })
      );
    } else {
      setFormatedData([{ amount: 100, color: "#F0F4F7", id: "1" }]);
    }
  }, [budgetsSpendingsByMonth]);

  const monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (
    <div className=" w-full fixed  top-0 bottom-0 left-0 right-0 overflow-y-auto overflow-x-hidden bg-surface py-4">
      <div className=" flex justify-between items-center">
        <div className="font-bold text-dark text-lg">Statistics</div>

        <AlertDialog>
          <AlertDialogTrigger>
            <Touchable className=" bg-container rounded-2xl p-4 text-md gap-2 flex justify-between items-center font-bold text-secondary ">
              <div>{monthsNames[budgetsSpendingsByMonth.month]} 2024</div>
              <motion.img
                src={caret_secondary}
                alt=""
                className=" w-4"
                transition={generalTransition}
                animate={{
                  rotate: true ? 180 : 0,
                }}
              />
            </Touchable>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className=" rounded-2xl p-4 bg-surface w-full mx-4">
              <AlertDialogCancel className=" mb-4">
                <Icon src={exit_main} varient="mid" />
              </AlertDialogCancel>{" "}
              <div className=" w-full gap-2 grid grid-cols-3">
                {monthsNames.map((month, index) => {
                  return (
                    <AlertDialogAction
                      key={month}
                      onClick={() => setBudgetsSpendingsByMonth(budgetsSpendingsByMonths.find((monthSpendings) => monthSpendings.month === index)!)}
                    >
                      <Touchable
                        className={cn(
                          "dlex justify-center text-center   overflow-hidden rounded-2xl items-center p-4 text-dark font-semibold",
                          index === budgetsSpendingsByMonth.month && "bg-main text-surface"
                        )}
                      >
                        {month.slice(0, 3)}
                      </Touchable>
                    </AlertDialogAction>
                  );
                })}
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className=" mx-4  border-container border-2 rounded-2xl flex p-4 justify-center items-center flex-col">
        {budgetsSpendingsByMonthsStatus === "success" && (
          <CircleGraph data={fromatedData} roundness={8} segmentBorderWidth={5} segmentWidth={30} size={200} />
        )}
      </div>
    </div>
  );
};

export default Statistics;
