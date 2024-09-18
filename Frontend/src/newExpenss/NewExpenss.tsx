import Icon from "@/components/ui/Icon";
import generalTransition from "@/generalTransition";
import Touchable from "@/Touchable";
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
import { clearAllInForm } from "@/redux/formSlice";
import paper_plane_surface from "@/assets/paper_plane_surface.svg";
import { useAppDispatch } from "@/hooks";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

const StageProgressBar = ({
  currentStage,
  thisBarStage,
}: {
  currentStage: number;
  thisBarStage: number;
}) => {
  return (
    <div className=" h-2 w-full rounded-full bg-container ">
      <motion.div
        initial={{ width: 0 }}
        className=" bg-main rounded-full  h-full   "
        animate={{ width: currentStage >= thisBarStage ? "100%" : "0px" }}
        transition={generalTransition}
      ></motion.div>
    </div>
  );
};

const NewExpenss = () => {
  const [isReviewBeforeSubmitOpen, setIsReviewBeforeSubmitOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [currentStage, setCurrentStage] = useState(0);
  const lastStage = 4;

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
          {Array.from([1, 2, 3, 4], (item) => {
            return <StageProgressBar key={item} currentStage={currentStage} thisBarStage={item} />;
          })}
        </div>
        <div className=" w-full  justify-between items-center flex ">
          <Link to={"/"} onClick={() => dispatch(clearAllInForm())}>
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
              className="min-w-full flex flex-col  justify-between items-center    w-full h-full"
            >
              {stage.stageComponnet}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className=" w-full flex justify-between gap-2">
        {currentStage > 0 && (
          <Touchable
            onClick={previousStage}
            className="  bg-container  p-4 px-8 rounded-2xl flex justify-center items-center font-bold text-md text-surface"
          >
            <div className="w-6">
              <Icon varient="full" src={arrow_main}></Icon>
            </div>
          </Touchable>
        )}

        <AlertDialog
          open={isReviewBeforeSubmitOpen}
          onOpenChange={(isOpen) => {
            if (currentStage === 4) {
              setIsReviewBeforeSubmitOpen(isOpen);
            }
          }}
        >
          <AlertDialogTrigger className=" w-full">
            {" "}
            <Touchable
              onClick={handleNextStage}
              className=" w-full bg-main  gap-2  p-4 rounded-2xl flex justify-center items-center font-bold text-md  text-surface"
            >
              <div>{currentStage !== 4 ? "Next" : "Submit"}</div>
              <AnimatePresence>
                {currentStage === 4 && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={generalTransition}
                    src={paper_plane_surface}
                    className=" w-4"
                  />
                )}
              </AnimatePresence>
            </Touchable>
          </AlertDialogTrigger>
          <AlertDialogContent>
            fdfd
            <AlertDialogCancel>fdf</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
};

export default NewExpenss;
