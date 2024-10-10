import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogPortal,
  AlertDialogTrigger,
} from "@/components/alert-dialog";
import Icon from "@/components/Icon";
import tag_main from "@/assets/tag_main.svg";
import Touchable from "@/components/Touchable";
import React, { useState } from "react";
import exit_main from "@/assets/exit_main.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getAccountByIdSelector, getAllAccountsSelector, postNewAccountAsyncThunk, updateAccountByIdAsynkThunk } from "@/redux/accountsSlice";
import { AnimatePresence } from "framer-motion";
import { accountIcons } from "@/lib/icons";
import { motion } from "framer-motion";
import generalTransition from "@/lib/generalTransition";
import ILS_symbol_main from "@/assets/ils_symbol_main.svg";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
import warning_red from "@/assets/warning_red.svg";

import getAllDataFromAPI from "@/lib/getAllDataFromAPI";
import { toast } from "sonner";

const IconSelector = ({
  setSelectedIcon,
  setIsDialogOpen,
  selectedIcon,
}: {
  setIsDialogOpen: () => void;
  setSelectedIcon: (path: string) => void;
  selectedIcon: string | null;
}) => {
  return (
    <>
      {" "}
      <AlertDialogPortal>
        <motion.div
          transition={generalTransition}
          initial={{ opacity: 0 }}
          style={{ pointerEvents: "all" }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className=" inset-0  z-50 fixed  overflow-y-auto  bg-black/80 flex justify-center items-center"
        >
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ pointerEvents: "all" }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={generalTransition}
              className=" w-3/4 gap-8 shadow-xl  justify-between  overflow-y-auto   items-start p-4 flex-col flex mx-4 rounded-2xl bg-surface"
            >
              <div className=" w-full">
                <div onClick={setIsDialogOpen}>
                  <Icon src={exit_main} varient="mid" />
                </div>

                <div
                  style={{ pointerEvents: "all" }}
                  className=" max-h-[60vh]   overflow-y-auto w-full  grid grid-cols-4 gap-2 my-4   justify-start "
                >
                  {" "}
                  {accountIcons.map((icon) => {
                    return (
                      <div
                        onClick={() => {
                          setSelectedIcon(icon);
                          setIsDialogOpen();
                        }}
                        key={icon}
                        style={{ backgroundColor: icon === selectedIcon ? "#f0f4f7 " : "#f8fbfd" }}
                        className=" p-4 flex justify-center  items-center transition-all  bg-surface rounded-2xl "
                      >
                        <img src={icon} alt="" className=" w-10 h-10" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AlertDialogPortal>
    </>
  );
};

type Props = {
  trigger: React.ReactNode;
  accountId?: string;
};
const AccountForm = ({ trigger, accountId }: Props) => {
  const account = useAppSelector((state) => getAccountByIdSelector(state, accountId));
  const mode = account === undefined ? "new" : "edit";
  // an undefined account will fallback to default mode of new account

  const dispatch = useAppDispatch();
  const allActiveAccounts = useAppSelector(getAllAccountsSelector).filter((account) => !account.isDeleted);

  const [selectedName, setSelectedName] = useState<null | string>(account ? account.name : null);
  const [balanceInAgorot, setBalanceInAgorot] = useState(account ? account.balanceInAgorot : 0);
  const [selectedIcon, setSelectedIcon] = useState<string>(account ? account.iconURL : accountIcons[0]);
  const [isSelectIconDialogOpen, setIsSelectIconDialogOpen] = useState(false);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 25) {
      setSelectedName(e.target.value);
    }
  };
  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 100000000) {
      setBalanceInAgorot(Number(e.target.value));
    }
  };

  const handleChangeIsSelectIconDialogOpen = () => {
    setIsSelectIconDialogOpen(!isSelectIconDialogOpen);
  };

  const onSave = async () => {
    if (mode === "new") {
      if (allActiveAccounts.length > 7) {
        toast("you cannot have more than 8 accounts", { icon: <img src={warning_red} alt="" /> });
        return;
      }
      await dispatch(postNewAccountAsyncThunk({ balanceInAgorot, iconURL: selectedIcon, name: selectedName! }));
      getAllDataFromAPI(dispatch);
      setSelectedName(null);
      setSelectedIcon(accountIcons[0]);
      setBalanceInAgorot(0);
    } else {
      await dispatch(updateAccountByIdAsynkThunk({ balanceInAgorot, iconURL: selectedIcon, name: selectedName!, id: accountId! }));
      getAllDataFromAPI(dispatch);
    }
  };

  return (
    <>
      <AlertDialog>
        <AnimatePresence>
          {isSelectIconDialogOpen && (
            <IconSelector setSelectedIcon={setSelectedIcon} setIsDialogOpen={handleChangeIsSelectIconDialogOpen} selectedIcon={selectedIcon} />
          )}
        </AnimatePresence>

        <AlertDialogTrigger className=" w-full text-left ">{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <div className=" bg-surface w-full mx-4 rounded-2xl p-4">
            <AlertDialogCancel>
              <div>
                <Icon src={exit_main} varient="mid" />
              </div>
            </AlertDialogCancel>
            <div className=" font-semibold text-xl text-dark mt-4 mb-8">{mode === "new" ? "Create new" : "Edit"} account</div>
            <div className="text-secondary ml-4 mb-2 font-semibold  text-base  ">Choose a budget name</div>
            <label htmlFor="balanceInAgorot">
              <Touchable className={" bg-container p-4  mb-4   gap-3   outline-2  rounded-2xl flex justify-between items-center"}>
                <img className=" w-6 h-6" src={ILS_symbol_main} />
                <div className=" w-full">
                  {" "}
                  <div className="text-sm  text-main font-bold text-left"> Balance</div>
                  <div className="placeholder:text-secondary text-sm select-none w-full focus:outline-none text-dark font-semibold bg-transparent">
                    {String(formatAmountInAgorot(balanceInAgorot, true))}
                  </div>
                </div>
              </Touchable>
            </label>
            <input
              type="number"
              name="balanceInAgorot"
              id="balanceInAgorot"
              className="absolute opacity-0 top-0 left-0 "
              value={balanceInAgorot}
              onChange={handleBalanceChange}
            />
            <div className="text-secondary ml-4 mb-2 font-semibold  text-base  ">Choose a budget name</div>
            <Touchable className={" bg-container p-4  mb-4   gap-3   outline-2  rounded-2xl flex justify-between items-center"}>
              <img className=" w-6 h-6" src={tag_main} />
              <div className=" w-full">
                {" "}
                <div className="text-sm  text-main font-bold text-left"> Name</div>
                <input
                  type="name"
                  value={selectedName ? selectedName : ""}
                  onChange={handleNameChange}
                  placeholder="Cash, Leumi, Savings..."
                  className="placeholder:text-secondary text-sm select-none w-full focus:outline-none text-dark font-semibold bg-transparent "
                />
              </div>
            </Touchable>

            <div className=" flex justify-between items-start gap-6">
              <div>
                <div className="text-secondary  mb-2 font-semibold text-base ">Icon</div>
                <div
                  onClick={handleChangeIsSelectIconDialogOpen}
                  className=" 
outline-dashed  outline-secondary outline-[3px] -outline-offset-[3px]  bg-container w-14 h-14 flex justify-center items-center  p-3 rounded-2xl"
                >
                  <img src={selectedIcon} alt="" className=" w-6" />{" "}
                </div>
              </div>
              <div className="flex-1 mb-8"></div>
            </div>
            <div className=" flex gap-2">
              <AlertDialogAction onClick={onSave} className=" w-full " disabled={!selectedName || !selectedIcon}>
                <Touchable className=" mt-5 w-full p-4 bg-main text-sm font-bold  rounded-2xl text-surface">Save</Touchable>
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AccountForm;
