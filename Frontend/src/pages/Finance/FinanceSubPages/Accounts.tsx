import Icon from "@/components/Icon";
import React, { useState } from "react";
import ellipsis_main from "@/assets/ellipsis_main.svg";
import ellipsis_secondary from "@/assets/ellipsis_secondary.svg";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
import { useAppSelector } from "@/hooks/hooks";
import { getAccountsStatusSelector, getAllAccountsSelector } from "@/redux/accountsSlice";
import { Account } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import caret_secondary from "@/assets/caret_secondary.svg";
import generalTransition from "@/lib/generalTransition";
import link_secondary from "@/assets/link_secondary.svg";
import plus_surface from "@/assets/plus_surface.svg";
import { Skeleton } from "@/components/skeleton";
import Touchable from "@/components/Touchable";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import DeleteWarning from "@/features/DeleteWarning";
import { AlertDialog, AlertDialogCancel, AlertDialogContent } from "@/components/alert-dialog";
import exit_main from "@/assets/exit_main.svg";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { PopoverClose } from "@radix-ui/react-popover";
import NewAccountForm from "@/features/NewAccountForm";

const Accounts = () => {
  const allAcounts = useAppSelector(getAllAccountsSelector);
  const accountsStatus = useAppSelector(getAccountsStatusSelector);

  const [openAccount, setOpenAccount] = useState<string | null>(null);

  const onDeleteAccount = () => {};
  return (
    <div className=" w-full mt-4 ">
      <div className=" mb-12">
        {" "}
        <div className=" w-full flex justify-end">
          <Touchable className=" w-10 h-10 bg-container rounded-2xl flex justify-center items-center">
            <img src={ellipsis_main} alt="" className="  h-6" />
          </Touchable>
        </div>
        <div className=" flex justify-center flex-col items-center mt-6">
          {" "}
          <div className=" text-secondary font-semibold">current blanace</div>
          <div className=" text-4xl text-dark font-extrabold mb-2">{formatAmountInAgorot(3243434 || 0, true)}</div>
          <div className=" bg-success/10 rounded-lg p-1 px-4 text-xs   text-left font-semibold text-success">1234.34 (124.24%)</div>
        </div>
      </div>
      <div className=" text-xl font-semibold mb-2 text-dark">Accoutns</div>
      <div className=" mb-24">
        {" "}
        {accountsStatus === "success"
          ? allAcounts.map((account) => {
              return (
                <div
                  key={account.id}
                  onClick={() => setOpenAccount(openAccount === account.id ? null : account.id)}
                  className=" shadow-sm w-full p-4 py-6 bg-container mb-4 rounded-2xl"
                >
                  <div className="  flex justify-between items-center ">
                    <div className=" flex justify-start gap-4 items-center">
                      <img src={account.iconURL} className=" w-6 " />
                      <div className="text-base text-secondary font-semibold">{account.name}</div>
                    </div>
                    <motion.img
                      transition={generalTransition}
                      animate={{ rotate: account.id === openAccount ? "180deg" : "0deg" }}
                      src={caret_secondary}
                      className=" w-4"
                    />
                  </div>
                  <AnimatePresence>
                    {openAccount === account.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={generalTransition}
                        exit={{ height: 0, opacity: 0 }}
                        className=" mt-4 mb-2"
                      >
                        <div className=" flex justify-between items-end">
                          <div>
                            {" "}
                            <div className="text-dark font-extrabold text-2xl">{formatAmountInAgorot(account.balanceInAgorot, true)}</div>
                            <div className="  bg-success/10 rounded-lg p-1 px-4 text-xs   text-left font-semibold mt-1   text-success">
                              1234.34 (124.24%)
                            </div>
                          </div>
                          <div className=" flex items-end">
                            <div className="  mr-4 bg-transparent outline outline-[2px] outline-secondary text-secondary flex justify-center items-center rounded-lg p-2  px-4 text-xs h-min   text-left font-bold mt-1  ">
                              4 <img src={link_secondary} className=" w-5 ml-2" alt="" />
                            </div>
                            <div onClick={(e) => e.stopPropagation()}>
                              <Popover>
                                <PopoverTrigger>
                                  <Icon src={ellipsis_secondary} varient="mid" />
                                </PopoverTrigger>
                                <PopoverContent
                                  sideOffset={-40}
                                  align="end"
                                  side="bottom"
                                  className=" flex flex-col justify-start items-start font-semibold overflow-hidden text-secondary"
                                >
                                  <NewAccountForm accountId={account.id} trigger={<Touchable className=" p-6 pl-4 py-2 ">Edit</Touchable>} />
                                  <AlertDialog>
                                    <AlertDialogTrigger>
                                      <Touchable className=" p-6 pl-4 py-2">Delete</Touchable>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <div className=" bg-surface w-full mx-4 rounded-2xl p-4  ">
                                        <AlertDialogCancel>
                                          <Icon src={exit_main} varient="mid" />
                                        </AlertDialogCancel>
                                        <DeleteWarning onConfirmDelete={onDeleteAccount} />
                                      </div>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          : Array.from([1, 2, 3], (_, index) => {
              return (
                <Skeleton key={index} className=" w-full flex justify-between items-center h-20 bg-container mb-4 px-4 rounded-2xl">
                  <div className=" flex gap-2 items-center">
                    <Skeleton className=" w-10 h-10" />
                    <Skeleton className=" w-32 h-6" />
                  </div>
                  <Skeleton className=" w-6 h-6" />
                </Skeleton>
              );
            })}
        <Touchable className=" w-full flex justify-center items-center h-14 bg-secondary mb-4 px-4 rounded-2xl">
          <img src={plus_surface} alt="" className=" w-6" />
        </Touchable>
      </div>
    </div>
  );
};

export default Accounts;
