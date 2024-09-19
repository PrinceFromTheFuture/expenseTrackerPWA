import facebookTest from "@/assets/facebookTest.svg";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import edit_main from "@/assets/edit_main.svg";
import trash_warning from "@/assets/trash_warning.svg";

import Icon from "@/components/ui/Icon.tsx";
import Touchable from "./Touchable.tsx";
import { RootState } from "@/redux/store.ts";
import { singleTransactionSelector } from "@/redux/transactionsSlice.ts";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot.ts";
import { useAppSelector } from "@/hooks.ts";
import dayjs from "dayjs";
import { getBudgetNameByIdSelector } from "@/redux/budgetsSlice.ts";
import { getPaymentMethodNameByIdSelector } from "@/redux/paymentMethodsSlice.ts";

const ExpensesWidget = ({ transactionId }: { transactionId: string }) => {
  const transaction = useAppSelector((state: RootState) =>
    singleTransactionSelector(state, transactionId)
  );

  const budgetName = useAppSelector((state) =>
    getBudgetNameByIdSelector(
      state,
      transaction ? transaction.budgetId : "erorr: no budget with this id"
    )
  );
  const paymentMethodName = useAppSelector((state) =>
    getPaymentMethodNameByIdSelector(
      state,
      transaction ? transaction.paymentMethodId : "erorr: no budget with this id"
    )
  );
  if (!transaction) {
    return <div>the data base doesnt contain a trnsaction with the id of {transactionId}</div>;
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger className=" w-full">
          <Touchable className=" box-content p-4 w-full bg-surface rounded-2xl flex justify-between items-center">
            <div className=" flex justify-start items-center gap-2 ">
              <Icon varient="full" src={facebookTest} />
              <div>
                <div className=" text-left text-sm font-bold">{transaction.title}</div>
                <div className=" text-xs text-secondary text-left font-semibold">{budgetName}</div>
              </div>
            </div>
            <div className="font-extrabold  text-base mr-8">
              - {formatAmountInAgorot(transaction.amountInAgorot, true)}
            </div>
          </Touchable>
        </DrawerTrigger>
        <DrawerContent>
          <div className=" w-full flex justify-between items-end mb-5">
            <div className=" font-semibold text-xl text-dark">transaction details</div>
            <div className=" flex justify-between gap-3 w-auto">
              {" "}
              <Icon src={trash_warning} varient="mid" />
              <Icon src={edit_main} varient="mid" />
            </div>
          </div>
          <div className=" w-full p-4 border-container border-2 rounded-2xl">
            <Touchable className=" mb-5 w-full bg-container rounded-lg p-4 flex justify-between items-center">
              <div className=" flex justify-start items-center gap-2 ">
                <Icon varient="full" src={facebookTest} />
                <div>
                  <div className=" text-sm font-bold">{transaction.title}</div>
                  <div className=" text-xs text-secondary text-left font-semibold">
                    {budgetName}
                  </div>
                </div>
              </div>
            </Touchable>
            <div className=" flex mb-5 justify-between items-center w-full">
              <div className="text-sm text-secondary text-left font-semibold">date and time</div>
              <div className="text-sm text-dark text-left font-bold">
                {dayjs(transaction.date).format("DD.MM.YYYY HH:mm")}
              </div>
            </div>
            <div className=" flex mb-5 justify-between items-center w-full">
              <div className="text-sm text-secondary text-left font-semibold">expenses title</div>
              <div className="text-sm text-dark text-left font-bold">{transaction.title}</div>
            </div>
            <div className=" flex mb-5 justify-between items-center w-full">
              <div className="text-sm text-secondary text-left font-semibold">budget category</div>
              <div className="text-sm text-dark text-left font-bold">{budgetName}</div>
            </div>
            <div className=" flex mb-3 justify-between items-center w-full">
              <div className="text-sm text-secondary text-left font-semibold">payment method</div>
              <div className="text-sm text-dark text-left font-bold">{paymentMethodName}</div>
            </div>
            <svg
              className=" mb-3 w-full px-1"
              width="829"
              height="10"
              viewBox="0 0 829 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="2.62268e-07"
                y1="3"
                x2="829"
                y2="4.00007"
                stroke="#BECDD5"
                stroke-width="7"
                stroke-dasharray="12 12"
              />
            </svg>
            <div className=" flex justify-between items-center w-full">
              <div className="text-sm text-secondary text-left font-semibold">total amount</div>
              <div className="text-sm text-dark text-left font-bold">
                {formatAmountInAgorot(transaction.amountInAgorot, true)}
              </div>
            </div>
          </div>
          <DrawerClose className=" w-full">
            <Touchable className=" mt-5 w-full p-4 bg-secondary text-sm font-bold  rounded-2xl text-surface">
              Close
            </Touchable>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ExpensesWidget;
