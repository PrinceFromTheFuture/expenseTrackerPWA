import { AnimatePresence, motion } from "framer-motion";
import { formatAmountInAgorot } from "../../../lib/formatAmountInAgorot";
import { useAppSelector } from "../../../lib/hooks/hooks";
import { spendingsTimeFramePreferenceSelector } from "../../../redux/userPreferencesSlice";
import { SpendingsTimeFrameSelector } from "../../../redux/userSlice";
import { RootState } from "../../../redux/store";
import generalTransition from "../../../lib/generalTransition";

const SpendingsTimeFrameValues = () => {
  const oneDaysSpendings = useAppSelector((state: RootState) =>
    SpendingsTimeFrameSelector(state, "1d")
  );
  const sevenDaysSpendings = useAppSelector((state: RootState) =>
    SpendingsTimeFrameSelector(state, "7d")
  );
  const thirtyDaysSpendings = useAppSelector((state: RootState) =>
    SpendingsTimeFrameSelector(state, "30d")
  );
  const spendingsTimeFramePreferance = useAppSelector(spendingsTimeFramePreferenceSelector);
  return (
    <div className=" relative">
      <AnimatePresence>
        {spendingsTimeFramePreferance === "1d" && (
          <motion.div
            initial={{ opacity: 0, top: 10 }}
            animate={{ opacity: 1, top: 0 }}
            exit={{ opacity: 0, top: -10 }}
            transition={generalTransition}
            className=" text-dark font-extrabold text-2xl absolute"
          >
            {formatAmountInAgorot(oneDaysSpendings || 0, true)}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {spendingsTimeFramePreferance === "7d" && (
          <motion.div
            initial={{ opacity: 0, top: 10 }}
            animate={{ opacity: 1, top: 0 }}
            exit={{ opacity: 0, top: -10 }}
            transition={generalTransition}
            className=" text-dark font-extrabold text-2xl absolute"
          >
            {formatAmountInAgorot(sevenDaysSpendings || 0, true)}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {spendingsTimeFramePreferance === "30d" && (
          <motion.div
            initial={{ opacity: 0, top: 10 }}
            animate={{ opacity: 1, top: 0 }}
            exit={{ opacity: 0, top: -10 }}
            transition={generalTransition}
            className=" text-dark font-extrabold text-2xl absolute"
          >
            {formatAmountInAgorot(thirtyDaysSpendings || 0, true)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpendingsTimeFrameValues;
