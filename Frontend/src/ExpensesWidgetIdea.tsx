import  { useRef, useState } from "react";
import facebookTest from "@/assets/facebookTest.svg";
import { AnimatePresence, motion } from "framer-motion";
import { easeInOut } from "framer-motion/dom";
const ExpensesWidget = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOPen] = useState(false);
  return (
    <>
      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            className=" fixed w-full px-4 bg-surface z-20  rounded-2xl flex justify-between items-center"
            onClick={() => {
              setIsOPen(!isOpen);
              console.log(
                ref.current!.getBoundingClientRect().top,
                ref.current!.getBoundingClientRect().left
              );
            }}
            layout
            initial={{
              top: ref.current!.getBoundingClientRect().top,
              left: ref.current!.getBoundingClientRect().left,
              height: ref.current!.getBoundingClientRect().height,
            }}
            animate={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,

              height: "100%",
            }}
            exit={{
              top: ref.current!.getBoundingClientRect().top,
              left: ref.current!.getBoundingClientRect().left,
              height: ref.current!.getBoundingClientRect().height,
            }}
            transition={{
              duration: 0.2,
              bounce: 1,
              ease: easeInOut,
            }}
          >
            <div className=" flex justify-start items-center gap-2">
              <img src={facebookTest} alt="" className=" w-10" />
              <div>
                <div className=" text-sm font-bold">Expensess number ne</div>
                <div className=" text-xs text-secondary font-semibold">budget Category</div>
              </div>
            </div>
            <div className="font-extrabold  text-base">- $100.00</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onClick={(e) => {
          setIsOPen(!isOpen);
          console.log(
            ref.current!.getBoundingClientRect().top,
            ref.current!.getBoundingClientRect().left,
            e.currentTarget.getBoundingClientRect().top
          );
        }}
        ref={ref}
        className="  box-content p-4 w-full bg-transparent rounded-2xl flex justify-between items-center"
      >
        <div className=" flex justify-start items-center gap-2 ">
          <img src={facebookTest} alt="" className=" w-10" />
          <div>
            <div className=" text-sm font-bold">Expensess number ne</div>
            <div className=" text-xs text-secondary font-semibold">budget Category</div>
          </div>
        </div>
        <div className="font-extrabold  text-base mr-8">- $100.00</div>
      </div>
    </>
  );
};

export default ExpensesWidget;
