import caret_secondary from "@/assets/caret_secondary.svg";
import { useState } from "react";
import { motion } from "framer-motion";
import generalTransition from "@/generalTransition";
import { cn } from "@/lib/utils";
const Stage2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const budgets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  return (
    <div className=" w-full h-full flex-col flex justify-between items-center gap-4 my-8 ">
      <div className="text-secondary mb-1 font-semibold text-base">
        choose budget category
      </div>
      <motion.div
        transition={generalTransition}
        animate={{ maxHeight: isMenuOpen ? "22rem" : "20rem" }}
        className={cn(
          " h-full gap-4 grid grid-cols-2 justify-end   overflow-scroll w-full"
        )}
      >
        {budgets.map(() => {
          return <div className=" h-24 full min-h-24  bg-black"></div>;
        })}
      </motion.div>
      <div
        className=" flex justify-center items-center gap-2"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <div className="text-secondary mb-1 font-semibold text-base">
          see More
        </div>
        <motion.img
          src={caret_secondary}
          alt=""
          className=" w-4"
          transition={generalTransition}
          animate={{ rotate: isMenuOpen ? 180 : 0 }}
        />
      </div>
    </div>
  );
};

export default Stage2;
