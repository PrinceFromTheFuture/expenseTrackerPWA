import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { AnimatePresence, motion } from "framer-motion";
import Touchable from "./components/ui/generalComponents/Touchable";
import bell_ from "@/assets/shirt";
import home_main from "@/assets/navLinks/home_main.svg";
import home_secondary_outline from "@/assets/navLinks/home_secondary_outline.svg";

const PageWraper = ({
  currentPage,
  children,
  page,
}: {
  currentPage: number;
  page: number;
  children: React.ReactNode;
}) => {
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

const Link = ({
  isActive,
  activeIconURL,
  IconURL,
}: {
  isActive: boolean;
  activeIconURL: string;
  IconURL: string;
}) => {
  return (
    <div>
      <Touchable
        animate={{ backgroundColor: isActive ? "#E1ECF1" : "#f8fbfd" }}
        className=" w-10 h-10   rounded-2xl flex justify-center items-center"
      >
        <img src={isActive ? activeIconURL : IconURL} alt="" className=" w-4" />
      </Touchable>
    </div>
  );
};
const NavTest = () => {
  const path = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    { element: <Home />, index: 0 },
    { element: <Home />, index: 1 },
    { element: <Home />, index: 2 },
    { element: <Home />, index: 3 },
  ];

  const handleChnagePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className=" fixed inset-0">
      <div
        className=" absolute z-10 rounded-tl-2xl py-4 flex justify-evenly items-center bg-surface shadow-2xl w-full bottom-0"
        style={{ boxShadow: "0px 10px 20px  10px rgba(0,0,0,0.1)" }}
      >
        <Link isActive={true} IconURL={home_secondary_outline} activeIconURL={home_main} />
        <Link isActive={true} IconURL={home_secondary_outline} activeIconURL={home_main} />
        <Link isActive={true} IconURL={home_secondary_outline} activeIconURL={home_main} />
        <Link isActive={true} IconURL={home_secondary_outline} activeIconURL={home_main} />
        <Link isActive={true} IconURL={home_secondary_outline} activeIconURL={home_main} />
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

export default NavTest;
