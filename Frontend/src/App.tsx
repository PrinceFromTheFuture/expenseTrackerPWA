import ExpensesWidget from "./ExpensesWidget";

import Icon from "./components/ui/Icon";
import edit_main from "@/assets/edit_main.svg";
import bell_surface from "@/assets/bell_surface.svg";

import { formatAmountInAgorot } from "./lib/formatAmountInAgorot";
import SpendingsTimeFrame from "./SpendingsTimeFrame";

const App = () => {
  return (
    <div className=" w-full fixed inset-0 bg-surface select-none font-montserrat py-4 ">
      <div className=" flex justify-between items-start mx-4">
        <Icon varient="mid" src={edit_main} />
        <div className=" font-bold text-dark text-lg">Home</div>
        <Icon varient="mid" src={edit_main} />
      </div>
      <div className=" w-full py-20 flex flex-col justify-center items-center">
        <div className=" text-4xl text-dark font-extrabold">₪ 12,234.21</div>
        <div className=" text-secondary font-semibold">current blanace</div>
      </div>
      <div className="   mx-4">
        <div className=" text-2xl font-semibold mb-2 text-dark ">useful insights</div>
        <div className="   flex gap-4 justify-between items-center">
          <div className=" bg-container  rounded-l-2xl rounded-r-md w-full flex justify-between  h-24 items-start p-4">
            <div>
              {" "}
              <div className=" text-secondary mb-1 font-semibold text-base">my behavior</div>
              <div className=" text-dark font-extrabold text-2xl">
                {formatAmountInAgorot(6435431)}
              </div>
            </div>
            <Icon src={bell_surface} varient="small" />
          </div>
          <SpendingsTimeFrame />
        </div>
      </div>
      <ExpensesWidget transactionId="#$327892h" />
    </div>
  );
};

export default App;
