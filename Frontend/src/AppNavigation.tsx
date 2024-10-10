import React, {  useState } from "react";
import Home from "./pages/Home";
import { AnimatePresence, motion } from "framer-motion";
import Touchable from "./components/Touchable";
import { Link } from "react-router-dom";
import home_main from "@/assets/navLinks/home_main.svg";
import coins_main from "@/assets/navLinks/coins_main.svg";
import gear_main from "@/assets/navLinks/gear_main.svg";
import statistics_main from "@/assets/navLinks/statistics_main.svg";
import home_secondary_outline from "@/assets/navLinks/home_secondary_outline.svg";
import gear_secondary_outline from "@/assets/navLinks/gear_secondary_outline.svg";
import statistics_secondary_outline from "@/assets/navLinks/statistics_secondary_outline.svg";
import coins_secondary_outline from "@/assets/navLinks/coins_secondary_outline.svg";
import recipt_surface from "@/assets/navLinks/recipt_surface.svg";
import Finance from "./pages/Finance/Finance";
import { Toaster } from "./components/ui/sonner";

const PageWraper = ({ currentPage, children, page }: { currentPage: number; page: number; children: React.ReactNode }) => {
  return (
    <motion.div
      animate={{
        transform: `translate(-${currentPage * 100}%)`,
      }}
      className="min-w-full flex flex-col  justify-between items-center     w-full h-full"
    >
      <AnimatePresence>
        {currentPage === page && (
          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const NavItem = ({
  isActive,
  activeIconURL,
  IconURL,
  label,
  onClick,
}: {
  isActive: boolean;
  activeIconURL: string;
  IconURL: string;
  label: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div onClick={onClick} className=" flex justify-center flex-col items-center">
      <Touchable
        animate={{ backgroundColor: isActive ? "#E1ECF1" : "#f8fbfd" }}
        className=" w-10 h-10 mb-1  rounded-2xl flex justify-center items-center"
      >
        <img src={isActive ? activeIconURL : IconURL} alt="" className=" w-4" />
      </Touchable>
      <motion.div animate={{ color: isActive ? "#0d6680" : "#9daab0" }} className="text-xs   text-left font-semibold">
        {label}
      </motion.div>
    </div>
  );
};
const AppNavigation = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    { element: <Home />, index: 0 },
    { element: <Finance />, index: 1 },
    { element: <div className=" flex justify-center items-center h-[60vh]">Coming soon...</div>, index: 2 },
    { element: <div className=" flex justify-center items-center h-[60vh]">Coming soon...</div>, index: 3 },
  ];

  return (
    <div className=" fixed inset-0">
      <Toaster />
      <div
        className=" absolute z-10 rounded-tl-2xl py-4 flex justify-evenly items-center bg-surface shadow-2xl w-full bottom-0"
        style={{ boxShadow: "0px 10px 20px  10px rgba(0,0,0,0.1)" }}
      >
        <NavItem
          onClick={() => setCurrentPage(0)}
          label="Home"
          isActive={currentPage === 0}
          IconURL={home_secondary_outline}
          activeIconURL={home_main}
        />
        <NavItem
          onClick={() => setCurrentPage(1)}
          label="Finance"
          isActive={currentPage === 1}
          IconURL={coins_secondary_outline}
          activeIconURL={coins_main}
        />
        <Link
          to={"/new"}
          onClick={() => {
            navigator.vibrate(100);
          }}
        >
          <Touchable className=" w-12 h-12  shadow-md   bg-main rotate-45 rounded-2xl flex justify-center items-center">
            <img src={recipt_surface} alt="" className=" -rotate-45 w-4" />
          </Touchable>
        </Link>
        <NavItem
          onClick={() => setCurrentPage(2)}
          label="Statistics"
          isActive={currentPage === 2}
          IconURL={statistics_secondary_outline}
          activeIconURL={statistics_main}
        />
        <NavItem
          onClick={() => setCurrentPage(3)}
          label="Settings"
          isActive={currentPage === 3}
          IconURL={gear_secondary_outline}
          activeIconURL={gear_main}
        />
      </div>
      <div className=" flex w-full h-full">
        {pages.map((page) => {
          return (
            <PageWraper page={page.index} currentPage={currentPage} key={page.index}>
              {page.element}
            </PageWraper>
          );
        })}
      </div>
    </div>
  );
};

export default AppNavigation;
