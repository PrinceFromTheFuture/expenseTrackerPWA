import { motion } from "framer-motion";
import generalTransition from "./generalTransition";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  changeSpendingsTimeFrame,
  spendingsTimeFramePreferenceSelector,
} from "./redux/userPreferencesSlice";

const SpendingsTimeFrame = () => {
  const spendingsTimeFrame = useAppSelector(
    spendingsTimeFramePreferenceSelector
  );
  const dispatch = useAppDispatch();
  return (
    <div
      className="  h-24 flex flex-col items-center relative   w-16 "
      style={{
        justifyContent:
          spendingsTimeFrame === "1d"
            ? "start"
            : spendingsTimeFrame === "7d"
            ? "center"
            : "end",
      }}
    >
      <motion.div
        transition={generalTransition}
        layout
        className=" w-full h-1/3 bg-container rounded-l-md rounded-r-2xl  "
      ></motion.div>
      <div className=" absolute top-0 bottom-0 left-0 right-0 flex-col items-center  justify-between">
        <motion.div
          transition={generalTransition}
          animate={{
            color: spendingsTimeFrame === "1d" ? "#171c1f  " : "#9daab0  ",
          }}
          onClick={() => dispatch(changeSpendingsTimeFrame("1d"))}
          className=" text-base text-dark font-bold h-1/3  flex justify-center items-center"
        >
          1d
        </motion.div>
        <motion.div
          transition={generalTransition}
          animate={{
            color: spendingsTimeFrame === "7d" ? "#171c1f  " : "#9daab0  ",
          }}
          onClick={() => dispatch(changeSpendingsTimeFrame("7d"))}
          className="text-base  text-dark font-bold h-1/3 flex justify-center items-center"
        >
          7d
        </motion.div>
        <motion.div
          transition={generalTransition}
          animate={{
            color: spendingsTimeFrame === "30d" ? "#171c1f  " : "#9daab0  ",
          }}
          onClick={() => dispatch(changeSpendingsTimeFrame("30d"))}
          className="  text-base text-dark font-bold h-1/3 flex justify-center items-center"
        >
          30d
        </motion.div>
      </div>
    </div>
  );
};

export default SpendingsTimeFrame;
