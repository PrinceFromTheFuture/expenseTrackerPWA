import caret_secondary from "@/assets/caret_secondary.svg";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import generalTransition from "@/generalTransition";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { allBugdetsSelctor } from "@/redux/budgetsSlice";
import { formDataSelector, selectBudgetInForm } from "@/redux/formSlice";
import Icon from "@/components/ui/Icon";
import Touchable from "@/components/ui/generalComponents/Touchable";
const Stage2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const selctedBudgetId = useAppSelector(formDataSelector).budgetId;

  const dispatch = useAppDispatch();
  const allBudgets = useAppSelector(allBugdetsSelctor);
  const budgetsWidgetsContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div className=" w-full h-full flex-col flex justify-between items-center gap-4 my-8 ">
      <div className="text-secondary mb-1 font-semibold text-base">Select Budget Category </div>
      <motion.div
        ref={budgetsWidgetsContainerRef}
        transition={generalTransition}
        animate={{
          maxHeight: isMenuOpen ? "22rem" : "20rem",
          overflow: isMenuOpen ? "auto" : "hidden",
        }}
        className={cn(" h-full gap-4 grid grid-cols-2 justify-end   overflow-scroll w-full")}
      >
        {allBudgets.map((budget) => {
          return (
            <Touchable
              key={budget.id}
              onClick={() => dispatch(selectBudgetInForm(budget.id))}
              animate={{
                outlineOffset: selctedBudgetId === budget.id ? "-2px" : "0px",
                outlineWidth: selctedBudgetId === budget.id ? "2px" : "0px",
              }}
              className=" h-36 full flex-col outline-main outline  min-h-24 rounded-2xl  bg-container relative flex justify-center items-center"
            >
              <motion.div
                transition={generalTransition}
                initial={{
                  backgroundColor: "#9daab0",
                }}
                animate={{
                  backgroundColor: selctedBudgetId === budget.id ? "#0d6680" : "#9daab0",
                }}
                className=" flex justify-center  items-center absolute top-4 left-4 w-4 h-4 rounded-full "
              >
                <motion.div
                  transition={generalTransition}
                  animate={{
                    width: selctedBudgetId === budget.id ? "50%" : "80%",
                    height: selctedBudgetId === budget.id ? "50%" : "80%",
                  }}
                  className="  bg-container rounded-full"
                ></motion.div>
              </motion.div>
              <Icon
                backgroundColor={budget.color}
                src={`/src/assets/${budget.name}/${budget.iconName}_surface.svg`}
                varient="small"
              />
              <div className=" text-dark font-bold">{budget.name}</div>
            </Touchable>
          );
        })}
      </motion.div>
      <div
        className=" flex justify-center items-center gap-2"
        onClick={() => {
          budgetsWidgetsContainerRef.current?.scrollTo({
            top: 0,
          });
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <div className="text-secondary mb-1 font-semibold text-base">see more</div>
        <motion.img
          src={caret_secondary}
          alt=""
          className=" w-4"
          transition={generalTransition}
          animate={{
            rotate: isMenuOpen ? 180 : 0,
          }}
        />
      </div>
    </div>
  );
};

export default Stage2;
