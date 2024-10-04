import generalTransition from "@/lib/generalTransition";
import { motion } from "framer-motion";

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
        animate={{
          width: currentStage >= thisBarStage ? "100%" : "0px",
        }}
        transition={generalTransition}
      ></motion.div>
    </div>
  );
};
export default StageProgressBar;
