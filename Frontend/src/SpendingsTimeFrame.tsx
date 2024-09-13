import  { useState } from "react";
import { motion } from "framer-motion";
import generalTransition from "./generalTransition";

const SpendingsTimeFrame = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<1 | 7 | 30>(1);
  return (
    <div
      className="  h-24 flex flex-col items-center relative   w-16 "
      style={{
        justifyContent:
          selectedTimeFrame === 1 ? "start" : selectedTimeFrame === 7 ? "center" : "end",
      }}
    >
      <motion.div
        transition={generalTransition}
        onClick={() => setSelectedTimeFrame(7)}
        layout
        className=" w-full h-1/3 bg-container rounded-l-md rounded-r-2xl  "
      ></motion.div>
      <div className=" absolute top-0 bottom-0 left-0 right-0 flex-col items-center  justify-between">
        <motion.div
          transition={generalTransition}
          animate={{ color: selectedTimeFrame === 1 ? "#171c1f  " : "#9daab0  " }}
          onClick={() => setSelectedTimeFrame(1)}
          className=" text-base text-dark font-bold h-1/3  flex justify-center items-center"
        >
          1d
        </motion.div>
        <motion.div
          transition={generalTransition}
          animate={{ color: selectedTimeFrame === 7 ? "#171c1f  " : "#9daab0  " }}
          onClick={() => setSelectedTimeFrame(7)}
          className="text-base  text-dark font-bold h-1/3 flex justify-center items-center"
        >
          7d
        </motion.div>
        <motion.div
          transition={generalTransition}
          animate={{ color: selectedTimeFrame === 30 ? "#171c1f  " : "#9daab0  " }}
          onClick={() => setSelectedTimeFrame(30)}
          className="  text-base text-dark font-bold h-1/3 flex justify-center items-center"
        >
          30d
        </motion.div>
      </div>
    </div>
  );
};

export default SpendingsTimeFrame;
