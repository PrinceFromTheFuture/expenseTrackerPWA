import ExpensesWidget from "./ExpensesWidget";

import Tuchable from "./Tuchable";
import Icon from "./components/ui/Icon";
import edit_main from "@/assets/edit_main.svg";

const App = () => {
  return (
    <div className=" w-full fixed inset-0 bg-surface select-none font-montserrat py-4 ">
      <div className=" flex justify-between items-start mx-4">
        <Tuchable>
          <Icon varient="mid" src={edit_main} />
        </Tuchable>
        <div className=" font-bold text-dark text-lg">Home</div>
        <Tuchable>
          <Icon varient="mid" src={edit_main} />
        </Tuchable>
      </div>
      <div className=" w-full py-20 flex flex-col justify-center items-center">
        <div className=" text-3xl text-dark font-extrabold">₪ 12,234.21</div>
        <div className=" text-secondary font-semibold">current blanace</div>
      </div>
      <ExpensesWidget transactionId="#$327892h" />\
    </div>
  );
};

export default App;
