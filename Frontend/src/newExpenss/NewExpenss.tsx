import Icon from "@/components/ui/Icon";
import generalTransition from "@/generalTransition";
import Tuchable from "@/Tuchable";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import arrow_main from "@/assets/arrow-main.svg";
import edit_main from "@/assets/edit_main.svg";
import { Link } from "react-router-dom";
import exit_main from "@/assets/exit_main.svg";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import Stage5 from "./Stage5";
import Stage6 from "./Stage6";

const NewExpenss = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const lastStage = 5;

  const handleNextStage = () => {
    if (currentStage <= lastStage - 1) {
      setCurrentStage((pre) => pre + 1);
    }
  };

  const previousStage = () => {
    if (currentStage >= 0) {
      setCurrentStage((pre) => pre - 1);
    }
  };
  const stages = [
    { stageComponnet: <Stage1 />, stageIndex: 0 },
    { stageComponnet: <Stage2 />, stageIndex: 1 },
    { stageComponnet: <Stage3 />, stageIndex: 2 },
    { stageComponnet: <Stage4 />, stageIndex: 3 },
    { stageComponnet: <Stage5 />, stageIndex: 4 },
    { stageComponnet: <Stage6 />, stageIndex: 5 },
  ];
  return (
    <motion.div
      transition={generalTransition}
      initial={{ opacity: 0, top: 40 }}
      animate={{ opacity: 1, top: 0 }}
      exit={{ opacity: 0, top: 40 }}
      className="bg-surface inset-0 fixed     p-4 flex justify-between items-center flex-col  overflow-hidden w-full h-full"
    >
      <div className=" w-full ">
        {" "}
        <div className=" w-full gap-3 h-5 mb-4  flex ">
          <div className=" h-2 w-full rounded-full bg-container ">
            <motion.div
              className=" bg-main rounded-full w-full  h-full   "
              transition={generalTransition}
            ></motion.div>
          </div>
          <div className=" h-2 w-full rounded-full bg-container ">
            <motion.div
              initial={{ width: 0 }}
              className=" bg-main rounded-full  h-full   "
              animate={{ width: currentStage >= 1 ? "100%" : "0px" }}
              transition={generalTransition}
            ></motion.div>
          </div>
          <div className=" h-2 w-full rounded-full bg-container ">
            <motion.div
              initial={{ width: 0 }}
              className=" bg-main rounded-full  h-full   "
              animate={{ width: currentStage >= 2 ? "100%" : "0px" }}
              transition={generalTransition}
            ></motion.div>
          </div>
          <div className=" h-2 w-full rounded-full bg-container ">
            <motion.div
              initial={{ width: 0 }}
              className=" bg-main rounded-full  h-full   "
              animate={{ width: currentStage >= 3 ? "100%" : "0px" }}
              transition={generalTransition}
            ></motion.div>
          </div>
          <div className=" h-2 w-full rounded-full bg-container ">
            <motion.div
              className=" bg-main rounded-full  h-full   "
              initial={{ width: 0 }}
              animate={{ width: currentStage >= 4 ? "100%" : "0px" }}
              transition={generalTransition}
            ></motion.div>
          </div>
          <div className=" h-2 w-full rounded-full bg-container ">
            <motion.div
              className=" bg-main rounded-full w  h-full   "
              initial={{ width: 0 }}
              animate={{ width: currentStage >= 5 ? "100%" : "0px" }}
              transition={generalTransition}
            ></motion.div>
          </div>
        </div>
        <div className=" w-full  justify-between items-center flex ">
          <Link to={"/"}>
            {" "}
            <Icon varient="mid" src={exit_main} />
          </Link>
          <div className="font-bold text-dark text-lg">New Transaction</div>

          <div className=" invisible">
            <Icon varient="mid" src={edit_main} />
          </div>
        </div>
      </div>
      <div className=" flex w-full h-full">
        <AnimatePresence>
          {stages.map((stage) => (
            <motion.div
              key={stage.stageIndex} // Add key for each item
              initial={{ opacity: 0 }}
              animate={{
                transform: `translate(-${currentStage * 100}%)`,
                opacity: stage.stageIndex === currentStage ? 1 : 0,
              }}
              className="min-w-full flex flex-col  justify-between items-center    w-full h-full" // Use flex-grow instead of flex-1
            >
              {stage.stageComponnet}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className=" w-full flex justify-between gap-2">
        {currentStage > 0 && (
          <Tuchable
            onClick={previousStage}
            className="  bg-container  p-4 px-8 rounded-2xl flex justify-center items-center font-bold text-md text-surface"
          >
            <div className="w-6">
              <Icon varient="full" src={arrow_main}></Icon>
            </div>
          </Tuchable>
        )}
        <Tuchable
          onClick={handleNextStage}
          className=" w-full bg-main  p-4 rounded-2xl flex justify-center items-center font-bold text-md  text-surface"
        >
          Next
        </Tuchable>
      </div>
    </motion.div>
  );
};

export default NewExpenss;
