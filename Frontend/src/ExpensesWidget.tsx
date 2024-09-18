import facebookTest from "@/assets/facebookTest.svg";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import edit_main from "@/assets/edit_main.svg";
import trash_warning from "@/assets/trash_warning.svg";

import Icon from "./components/ui/Icon";
import Touchable from "./Touchable";
import { RootState } from "./redux/store.ts";
import { singleTransactionSelector } from "./redux/transactionsSlice.ts";
import { formatAmountInAgorot } from "./lib/formatAmountInAgorot.ts";
import { useAppSelector } from "./hooks.ts";

const ExpensesWidget = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const transaction = useAppSelector(
    (state: RootState) =>
      singleTransactionSelector(state, transactionId)
  );

  if (!transaction) {
    return (
      <div>
        the data base doesnt contain a trnsaction with
        the id of {transactionId}
      </div>
    );
  }
  return (
    <>
      <Drawer>
        <DrawerTrigger className=" w-full">
          <Touchable className=" box-content p-4 w-full bg-surface rounded-2xl flex justify-between items-center">
            <div className=" flex justify-start items-center gap-2 ">
              <Icon
                varient="full"
                src={facebookTest}
              />
              <div>
                <div className=" text-left text-sm font-bold">
                  {transaction.title}
                </div>
                <div className=" text-xs text-secondary text-left font-semibold">
                  {transaction.budget}
                </div>
              </div>
            </div>
            <div className="font-extrabold  text-base mr-8">
              -{" "}
              {formatAmountInAgorot(
                transaction.amountInAgorot
              )}
            </div>
          </Touchable>
        </DrawerTrigger>
        <DrawerContent>
          <div className=" w-full flex justify-between items-end mb-5">
            <div className=" font-semibold text-xl text-dark">
              transaction details
            </div>
            <div className=" flex justify-between gap-3 w-auto">
              {" "}
              <Icon
                src={trash_warning}
                varient="mid"
              />
              <Icon src={edit_main} varient="mid" />
            </div>
          </div>
          <div className=" w-full p-4 border-container border-2 rounded-2xl"></div>

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
