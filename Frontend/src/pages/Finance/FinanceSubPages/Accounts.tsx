import Icon from "@/components/Icon";
import { useState } from "react";
import ellipsis_main from "@/assets/ellipsis_main.svg";
import ellipsis_secondary from "@/assets/ellipsis_secondary.svg";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { deleteAccountByIdAsynkThunk, getAccountsStatusSelector, getAllAccountsSelector } from "@/redux/accountsSlice";
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
import AccountForm from "@/features/AccountForm";
import getAllDataFromAPI from "@/lib/getAllDataFromAPI";
import AccountsViewPreferencesDialog from "@/features/AccountsViewPreferencesDialog";
import { accountsViewPreferencesSelector } from "@/redux/userPreferencesSlice";
import { allPaymentMethodsSelector } from "@/redux/paymentMethodsSlice";
import warning_red from "@/assets/warning_red.svg";

import { toast } from "sonner";

const Accounts = () => {
  const allAcounts = useAppSelector(getAllAccountsSelector);
  const accountsStatus = useAppSelector(getAccountsStatusSelector);
  const accountsBalanceViewPreferance = useAppSelector(accountsViewPreferencesSelector).accountsBalanceSumSelector;
  const [isDeletedialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const accountsViewPreferance = allAcounts.filter((account) => accountsBalanceViewPreferance.find((accountId) => account.id === accountId));
  const preferredBalanceView = accountsViewPreferance.reduce((accumulator, cuurentAccount) => accumulator + cuurentAccount.balanceInAgorot, 0);
  const activePaymentMethods = useAppSelector(allPaymentMethodsSelector).filter((paymentMethod) => !paymentMethod.isDeleted);

  const onDeleteAccount = async (accountId: string) => {
    if (allAcounts.filter((account) => !account.isDeleted).length === 1) {
      toast("you cannot have more than 8 accounts", { icon: <img src={warning_red} alt="" /> });
      return;
    }
    await dispatch(deleteAccountByIdAsynkThunk(accountId));
    getAllDataFromAPI(dispatch);
  };
  return (
    <div className=" w-full mt-4 ">
      <div className=" mb-12">
        <div className=" w-full flex justify-end">
          <Touchable className=" w-10 h-10 bg-container rounded-2xl flex justify-center items-center">
            <AccountsViewPreferencesDialog trigger={<img src={ellipsis_main} className="  h-6" />} />
          </Touchable>
        </div>
        <div className=" flex justify-center flex-col items-center mt-6">
          {" "}
          <div className=" text-secondary font-semibold">current blanace</div>
          <div className=" text-4xl text-dark font-extrabold mb-2">{formatAmountInAgorot(preferredBalanceView || 0, true)}</div>
          <div className=" bg-success/10 rounded-lg p-1 px-4 text-xs   text-left font-semibold text-success">1234.34 (124.24%)</div>
        </div>
      </div>
      <div className=" text-xl font-semibold mb-2 text-dark">Accoutns</div>
      <div className=" mb-24">
        {" "}
        {accountsStatus === "success"
          ? allAcounts
              .filter((account) => !account.isDeleted)
              .map((account) => {
                return (
                  <div
                    key={account.id}
                    onClick={() => {
                      setOpenAccount(openAccount === account.id ? null : account.id);
                    }}
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
                                {activePaymentMethods.filter((paymentMethod) => paymentMethod.accountId === account.id).length}{" "}
                                <img src={link_secondary} className=" w-5 ml-2" alt="" />
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
                                    <AccountForm accountId={account.id} trigger={<Touchable className=" p-6 pl-4 py-2 ">Edit</Touchable>} />
                                    <AlertDialog open={isDeletedialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                      <AlertDialogTrigger>
                                        <Touchable className=" p-6 pl-4 py-2">Delete</Touchable>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <div className=" bg-surface w-full mx-4 rounded-2xl p-4  ">
                                          <AlertDialogCancel>
                                            <Icon src={exit_main} varient="mid" />
                                          </AlertDialogCancel>
                                          <DeleteWarning
                                            onCancel={() => setIsDeleteDialogOpen(!isDeletedialogOpen)}
                                            onConfirmDelete={() => {
                                              onDeleteAccount(account.id);
                                              setIsDeleteDialogOpen(!isDeletedialogOpen);
                                            }}
                                          />
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
        <AccountForm
          trigger={
            <Touchable className=" w-full flex justify-center items-center h-14 bg-secondary mb-4 px-4 rounded-2xl">
              <img src={plus_surface} alt="" className=" w-6" />
            </Touchable>
          }
        />
      </div>
    </div>
  );
};

export default Accounts;
