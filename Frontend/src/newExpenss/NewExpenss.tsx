import Icon from "@/components/ui/Icon";
import generalTransition from "@/generalTransition";
import Tuchable from "@/Tuchable";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import arrow_main from "@/assets/arrow-main.svg";
import edit_main from "@/assets/edit_main.svg";

const NewExpenss = () => {
  const [stage, setStage] = useState(0);
  const lastStage = 5;

  const handleNextStage = () => {
    if (stage <= lastStage - 1) {
      setStage((pre) => pre + 1);
    }
  };

  const previousStage = () => {
    if (stage >= 0) {
      setStage((pre) => pre - 1);
    }
  };
  return (
    <motion.div
      transition={generalTransition}
      initial={{ opacity: 0, top: 40 }}
      animate={{ opacity: 1, top: 0 }}
      exit={{ opacity: 0, top: 40 }}
      className="bg-surface inset-0 fixed  p-4 flex justify-between items-center flex-col  overflow-hidden w-full h-full"
    >
      <div className=" w-full">
        {" "}
        <div className=" w-full gap-3 h-5 mb-2  flex ">
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
        <div className=" w-full  justify-between items-center flex ">
          <Icon varient="mid" src={edit_main} />
          <div className="font-bold text-dark text-lg">New Transaction</div>

          <div className=" invisible">
            <Icon varient="mid" src={edit_main} />
          </div>
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
      <div className=" w-full flex justify-between gap-2">
        {stage > 0 && (
          <Tuchable
            onClick={previousStage}
            className="  bg-container  p-4 px-8 rounded-2xl flex justify-center items-center font-bold text-md mt-5  text-surface"
          >
            <div className="w-6">
              <Icon varient="full" src={arrow_main}></Icon>
            </div>
          </Tuchable>
        )}
        <Tuchable
          onClick={handleNextStage}
          className=" w-full bg-main  p-4 rounded-2xl flex justify-center items-center font-bold text-md mt-5  text-surface"
        >
          Next
        </Tuchable>
      </div>
    </motion.div>
  );
};

export default NewExpenss;
