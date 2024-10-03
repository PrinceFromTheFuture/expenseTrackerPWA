import Icon from "@/components/ui/Icon";
import edit_main from "@/assets/edit_main.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import generalTransition from "@/lib/generalTransition";
import { cn } from "@/lib/utils";
import Accounts from "./FinanceSubPages/Accounts";

const SubPageWraper = ({ currentPage, children, page }: { currentPage: number; page: number; children: React.ReactNode }) => {
  return (
    <motion.div
      animate={{
        transform: `translate(-${currentPage * 100}%)`,
      }}
      className="min-w-full flex flex-col  justify-between items-center   w-full h-full"
    >
      <AnimatePresence>
        {currentPage === page && (
          <motion.div className=" w-full" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Finance = () => {
  const subPages = [
    { element: <Accounts />, index: 0 },
    { element: <div className="bg-red-800 w-full">fd</div>, index: 1 },
    { element: <div className="bg-red-200 w-full">fd</div>, index: 2 },
  ];
  const [activeSubPage, setActiveSubPage] = useState(0);
  return (
    <div className="w-full fixed  top-0 bottom-0 left-0 right-0 overflow-y-auto overflow-x-hidden bg-surface py-4">
      <div className=" mx-4 justify-between flex items-end mb-4">
        <div className="font-bold text-dark text-lg">Finance</div>
        <Icon src={edit_main} varient="mid" />
      </div>
      <div className=" flex   justify-between">
        <div
          className={cn("text-secondary text-center w-1/3 font-semibold text-base", activeSubPage === 0 && "text-main")}
          onClick={() => setActiveSubPage(0)}
        >
          Accounts
        </div>
        <div
          onClick={() => setActiveSubPage(1)}
          className={cn("text-secondary font-semibold w-1/3 text-center text-base", activeSubPage === 1 && "text-main")}
        >
          payments
        </div>
        <div
          onClick={() => setActiveSubPage(2)}
          className={cn("text-secondary font-semibold w-1/3 text-center text-base", activeSubPage === 2 && "text-main")}
        >
          Budgets
        </div>
      </div>
      <div className=" relative h-[4px] mt-4">
        <motion.div
          animate={{ x: activeSubPage === 0 ? "0%" : activeSubPage === 1 ? "100%" : "200%" }}
          transition={generalTransition}
          className=" absolute w-1/3 bg-main   h-[4px]"
        ></motion.div>
        <div className=" w-full bg-container h-[4px]"></div>
      </div>
      <div className="  mx-4 flex overflow-hidden">
        {subPages.map((subPage) => {
          return (
            <SubPageWraper key={subPage.index} currentPage={activeSubPage} page={subPage.index}>
              {subPage.element}
            </SubPageWraper>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Finance;
