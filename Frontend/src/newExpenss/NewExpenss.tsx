import generalTransition from "@/generalTransition";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const NewExpenss = () => {
  const [stage, setStage] = useState(0);
  const lastStage = 5;

  const handleNextStage = () => {
    if (stage <= lastStage) {
      setStage((pre) => pre + 1);
    }
  };

  const previousStage = () => {
    if (stage >= 0) {
      setStage((pre) => pre + 1);
    }
  };
  return (
    <motion.div
      transition={generalTransition}
      initial={{ opacity: 0, top: 40 }}
      animate={{ opacity: 1, top: 0 }}
      exit={{ opacity: 0, top: 40 }}
      className="bg-surface inset-0 fixed  p-4  overflow-hidden w-full h-full"
    >
      <div className=" w-full gap-3 h-5  flex ">
        <div className=" h-2 w-full rounded-full bg-container ">
          <motion.div
            className=" bg-main rounded-full  h-full   "
            animate={{ width: stage >= 0 ? "100%" : "0px" }}
            transition={generalTransition}
          ></motion.div>
        </div>
        <div className=" h-2 w-full rounded-full bg-container ">
          <motion.div
            className=" bg-main rounded-full  h-full   "
            animate={{ width: stage >= 1 ? "100%" : "0px" }}
            transition={generalTransition}
          ></motion.div>
        </div>
        <div className=" h-2 w-full rounded-full bg-container ">
          <motion.div
            className=" bg-main rounded-full  h-full   "
            animate={{ width: stage >= 2 ? "100%" : "0px" }}
            transition={generalTransition}
          ></motion.div>
        </div>
        <div className=" h-2 w-full rounded-full bg-container ">
          <motion.div
            className=" bg-main rounded-full  h-full   "
            animate={{ width: stage >= 3 ? "100%" : "0px" }}
            transition={generalTransition}
          ></motion.div>
        </div>
        <div className=" h-2 w-full rounded-full bg-container ">
          <motion.div
            className=" bg-main rounded-full  h-full   "
            animate={{ width: stage >= 4 ? "100%" : "0px" }}
            transition={generalTransition}
          ></motion.div>
        </div>
        <div className=" h-2 w-full rounded-full bg-container ">
          <motion.div
            className=" bg-main rounded-full  h-full   "
            animate={{ width: stage >= 5 ? "100%" : "0px" }}
            transition={generalTransition}
          ></motion.div>
        </div>
      </div>
      <div className=" flex">
        <AnimatePresence>
          {Array.from([0, 1, 2, 3, 4, 5], (singleStage) => (
            <motion.div
              key={singleStage} // Add key for each item
              animate={{
                transform: `translate(-${stage * 100}%)`,
                opacity: singleStage === stage ? 1 : 0,
              }}
              className="min-w-full flex flex-col  justify-between items-center   flex-grow w-full h-full" // Use flex-grow instead of flex-1
            >
              {stage}fd
              <div onClick={handleNextStage} className=" bg-black p-3">
                fd
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default NewExpenss;
