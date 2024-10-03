import Icon from "@/components/ui/Icon";
import React, { useState } from "react";
import ellipsis_main from "@/assets/ellipsis_main.svg";
import ellipsis_secondary from "@/assets/ellipsis_secondary.svg";
import Touchable from "@/components/ui/generalComponents/Touchable";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
import { useAppSelector } from "@/lib/hooks/hooks";
import { getAllAccountsSelector } from "@/redux/accountsSlice";
import { Account } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import caret_secondary from "@/assets/caret_secondary.svg";
import generalTransition from "@/lib/generalTransition";

const Accounts = () => {
  const allAcounts = useAppSelector(getAllAccountsSelector);
  const fakeAccounts: Account[] = [
    { balanceInAgorot: 344626, iconURL: "/src/assets/accountsIcons/leumi.svg", id: "fffd3", name: "leumi bank" },
    { balanceInAgorot: 89732, iconURL: "/src/assets/accountsIcons/cash.svg", id: "fdffsdf3", name: "leumi bank" },
    { balanceInAgorot: 397864, iconURL: "/src/assets/accountsIcons/payPal.svg", id: "fd3", name: "leumi bank" },
  ];
  const [openAccount, setOpenAccount] = useState<string | null>(null);
  return (
    <div className=" w-full mt-4">
      <div className=" mb-8">
        {" "}
        <div className=" w-full flex justify-end">
          <Touchable className=" w-10 h-10 bg-container rounded-2xl flex justify-center items-center">
            <img src={ellipsis_main} alt="" className="  h-6" />
          </Touchable>
        </div>
        <div className=" flex justify-center flex-col items-center mt-2">
          {" "}
          <div className=" text-secondary font-semibold">current blanace</div>
          <div className=" text-4xl text-dark font-extrabold mb-2">{formatAmountInAgorot(3243434 || 0, true)}</div>
          <div className=" bg-success/10 rounded-lg p-1 px-4 text-xs   text-left font-semibold text-success">1234.34 (124.24%)</div>
        </div>
      </div>
      <div className=" text-xl font-semibold mb-2 text-dark">Accoutns</div>
      {fakeAccounts.map((account) => {
        return (
          <div
            key={account.id}
            onClick={() => setOpenAccount(openAccount === account.id ? null : account.id)}
            className=" w-full p-4 py-6 bg-container mb-4 rounded-2xl"
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
                  className=" mt-2"
                >
                  <div className=" flex justify-between items-end">
                    <div>
                      {" "}
                      <div className="text-dark font-extrabold text-2xl">{formatAmountInAgorot(account.balanceInAgorot, true)}</div>
                      <div className="  bg-success/10 rounded-lg p-1 px-4 text-xs   text-left font-semibold mt-1   text-success">
                        1234.34 (124.24%)
                      </div>
                    </div>
                    <div className=" flex">
                      <div className="  mr-4 bg-transparent outline outline-secondary text-secondary rounded-lg p-1 px-4 text-xs   text-left font-semibold mt-1  ">
                        4 Links
                      </div>
                      <img src={ellipsis_secondary} className=" h-6" alt="" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accounts;
