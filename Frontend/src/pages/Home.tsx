import ExpensesWidget from "../features/ExpensesWidget";

import Icon from "../components/Icon";
import edit_main from "@/assets/edit_main.svg";
import bell_surface from "@/assets/bell_surface.svg";

import SpendingsTimeFrame from "../features/SpendingsTimeFrame";
import Touchable from "../components/Touchable";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { allTransactionsSelctor, getTransactionsDataStatusSelector } from "@/redux/transactionsSlice";

import SpendingsTimeFrameValues from "@/features/SpendingsTimeFrameValues";
import ExpensesWidgetSkeleton from "../components/skeletons/ExpensesWidgetSkeleton";
import { Link } from "react-router-dom";
import { signOutAsyncTunk, userBalanceSelector } from "../redux/userSlice";
import { formatAmountInAgorot } from "../lib/formatAmountInAgorot";
import { AnimatePresence, motion } from "framer-motion";
import dayjs from "dayjs";
import log_out_main from "@/assets/log_out_main.svg";

const Home = () => {
  const balance = useAppSelector(userBalanceSelector);
  const allTransactions = useAppSelector(allTransactionsSelctor);
  const dispatch = useAppDispatch();

  const transactionsDataStatus = useAppSelector(getTransactionsDataStatusSelector);

  return (
    <div className="  w-full fixed  top-0 bottom-0 left-0 right-0 overflow-y-auto overflow-x-hidden bg-surface select-none font-montserrat py-4 ">
      <div className=" flex justify-between items-start mx-4">
        <div
          className="rotate-180"
          onClick={() => {
            dispatch(signOutAsyncTunk());
          }}
        >
          <Icon varient="mid" src={log_out_main} />
        </div>
        <div className=" font-bold text-dark text-lg">Home</div>
        <Icon varient="mid" src={edit_main} />
      </div>
      <div className=" w-full py-20 flex flex-col justify-center items-center">
        <div className=" text-4xl text-dark font-extrabold">{formatAmountInAgorot(balance || 0, true)}</div>
        <div className=" text-secondary font-semibold">current blanace</div>
      </div>
      <div className="  mx-4 mb-8">
        <div className=" text-xl font-semibold mb-2 text-dark ">useful insights</div>
        <div className="   flex gap-4 justify-between items-center">
          <div className=" bg-container  rounded-l-2xl rounded-r-md w-full flex justify-between  h-24 items-start p-4">
            <div>
              <div className=" text-secondary mb-1 font-semibold text-base">my behavior</div>
              <SpendingsTimeFrameValues />
            </div>
            <Icon src={bell_surface} varient="small" />
          </div>
          <SpendingsTimeFrame />
        </div>
      </div>
      <div className=" mx-4 text-xl font-semibold mb-2 text-dark ">recent transactions</div>
      {transactionsDataStatus === "pending"
        ? Array.from([1, 2, 3, 4, 5], (item) => {
            return (
              <AnimatePresence key={item}>
                <motion.div>
                  <ExpensesWidgetSkeleton key={item} />
                </motion.div>
              </AnimatePresence>
            );
          })
        : allTransactions
            .slice()
            .sort((transactionA, transactionB) => dayjs(transactionA.date).diff(dayjs(transactionB.date)))
            .reverse()
            .map((transaction) => {
              return (
                <AnimatePresence key={transaction.id}>
                  <motion.div layout animate={{ opacity: 1, height: "auto" }} initial={{ opacity: 0, height: 0 }} exit={{ opacity: 0, height: 0 }}>
                    <ExpensesWidget transactionId={transaction.id} />
                  </motion.div>
                </AnimatePresence>
              );
            })}
    </div>
  );
};
export default Home;
