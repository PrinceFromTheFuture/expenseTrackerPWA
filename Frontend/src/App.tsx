import ExpensesWidget from "./ExpensesWidget";

import Icon from "./components/ui/Icon";
import edit_main from "@/assets/edit_main.svg";
import bell_surface from "@/assets/bell_surface.svg";

import SpendingsTimeFrame from "./SpendingsTimeFrame";
import Tuchable from "./Tuchable";
import { useAppSelector } from "./hooks";
import { allTransactionsSelctor } from "@/redux/transactionsSlice";

import SpendingsTimeFrameValues from "@/SpendingsTimeFrameValues.tsx";
import ExpensesWidgetSkeleton from "./ExpensesWidgetSkeleton";
import { Link } from "react-router-dom";
const App = () => {
  const allTransactions = useAppSelector(allTransactionsSelctor);

  return (
    <div className=" mainContainer w-full fixed  top-0 bottom-0 left-0 right-0 overflow-y-auto overflow-x-hidden bg-surface select-none font-montserrat py-4 ">
      <div className=" flex justify-between items-start mx-4">
        <Icon varient="mid" src={edit_main} />
        <div className=" font-bold text-dark text-lg">Home</div>
        <Icon varient="mid" src={edit_main} />
      </div>
      <div className=" w-full py-20 flex flex-col justify-center items-center">
        <div className=" text-4xl text-dark font-extrabold">₪ 12,234.21</div>
        <div className=" text-secondary font-semibold">current blanace</div>
      </div>
      <div className="  mx-4 mb-12">
        <div className=" text-xl font-semibold mb-2 text-dark ">
          useful insights
        </div>
        <div className="   flex gap-4 justify-between items-center">
          <div className=" bg-container  rounded-l-2xl rounded-r-md w-full flex justify-between  h-24 items-start p-4">
            <div>
              <div className=" text-secondary mb-1 font-semibold text-base">
                my behavior
              </div>
              <SpendingsTimeFrameValues />
            </div>
            <Icon src={bell_surface} varient="small" />
          </div>
          <SpendingsTimeFrame />
        </div>
        <Link to={"new"}>
          <Tuchable className=" w-full bg-main  p-4 rounded-2xl flex justify-center items-center font-bold text-xs mt-5  text-surface">
            new expenss
          </Tuchable>
        </Link>
      </div>
      <div className=" mx-4 text-xl font-semibold mb-2 text-dark ">
        recent transactions
      </div>
      {allTransactions.length === 0
        ? Array.from([1, 2, 3, 4, 5], (item) => {
            return <ExpensesWidgetSkeleton key={item} />;
          })
        : allTransactions.map((transaction) => {
            return (
              <ExpensesWidget
                key={transaction.id}
                transactionId={transaction.id}
              />
            );
          })}
    </div>
  );
};

export default App;
