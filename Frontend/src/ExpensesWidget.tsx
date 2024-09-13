import React, { useRef, useState } from "react";
import facebookTest from "@/assets/facebookTest.svg";
import { AnimatePresence, motion } from "framer-motion";
import { easeInOut } from "framer-motion/dom";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import edit_main from "@/assets/edit_main.svg";
import trash_warning from "@/assets/trash_warning.svg";

import completed from "@/assets/completed.svg";
import Icon from "./components/ui/Icon";
import Tuchable from "./Tuchable";
import SuccessBanner from "./SuccessBanner.tsx";

const ExpensesWidget = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger className=" w-full">
          <Tuchable className=" box-content p-4 w-full bg-surface rounded-2xl flex justify-between items-center">
            <div className=" flex justify-start items-center gap-2 ">
              <Icon varient="full" src={facebookTest} />
              <div>
                <div className=" text-sm font-bold">Expensess number ne</div>
                <div className=" text-xs text-secondary text-left font-semibold">
                  budget Category
                </div>
              </div>
            </div>
            <div className="font-extrabold  text-base mr-8">- $100.00</div>
          </Tuchable>
        </DrawerTrigger>
        <DrawerContent>
          <div className=" w-full flex my-10 justify-center items-center">
            {" "}
            <SuccessBanner />
          </div>

          <div className=" w-full flex justify-between items-end mb-5">
            <div className=" font-semibold text-xl text-dark">transaction details</div>
            <div className=" flex justify-between gap-3 w-auto">
              {" "}
              <Icon src={trash_warning} varient="mid" />
              <Icon src={edit_main} varient="mid" />
            </div>
          </div>
          <div className=" w-full p-4 border-container border-2 rounded-2xl">
            <Tuchable className=" mb-5 w-full bg-container rounded-lg p-4 flex justify-between items-center">
              <div className=" flex justify-start items-center gap-2 ">
                <Icon varient="full" src={facebookTest} />
                <div>
                  <div className=" text-sm font-bold">Expensess number ne</div>
                  <div className=" text-xs text-secondary text-left font-semibold">
                    budget Category
                  </div>
                </div>
              </div>
            </Tuchable>
            <div className=" flex mb-5 justify-between items-center w-full">
              <div className="text-sm text-secondary text-left font-semibold">date and time</div>
              <div className="text-sm text-dark text-left font-bold">19.2.2024 19:34</div>
            </div>
            <div className=" flex mb-5 justify-between items-center w-full">
              <div className="text-sm text-secondary text-left font-semibold">expenses title</div>
              <div className="text-sm text-dark text-left font-bold">19.2.2024 19:34</div>
            </div>
            <div className=" flex mb-5 justify-between items-center w-full">
              <div className="text-sm text-secondary text-left font-semibold">budget category</div>
              <div className="text-sm text-dark text-left font-bold">19.2.2024 19:34</div>
            </div>
            <div className=" flex mb-3 justify-between items-center w-full">
              <div className="text-sm text-secondary text-left font-semibold">payment method</div>
              <div className="text-sm text-dark text-left font-bold">19.2.2024 19:34</div>
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
              <div className="text-sm text-dark text-left font-bold">19.2.2024 19:34</div>
            </div>
          </div>

          <DrawerClose>
            <div>Cancel</div>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ExpensesWidget;
