import { Calendar } from "@/components/ui/calendar";
import Touchable from "@/Touchable";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import calender_main from "@/assets/calender_main.svg";
import clock_main from "@/assets/clock_main.svg";

import { useEffect, useState } from "react";
import generalTransition from "@/generalTransition";

import dayjs from "dayjs";
import {
  formDataSelector,
  modifyDateInForm,
} from "@/redux/formSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/hooks";
import TimePicker from "./TimePicker";

const Stage3 = () => {
  const [openMenu, setIsOpenMenu] = useState<
    "date" | "time"
  >("date");

  const formDateTime = useAppSelector(
    formDataSelector
  ).date;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(modifyDateInForm("initialize"));
  }, []);

  return (
    <div className=" w-full my-4 h-full flex justify-start flex-col items-center">
      <div className="text-secondary mb-4 font-semibold text-base">
        Set Time & Date
      </div>
      <Touchable
        onClick={() => setIsOpenMenu("date")}
        animate={{
          outlineOffset:
            openMenu === "date" ? "-2px" : "0px",
          outlineWidth:
            openMenu === "date" ? "2px" : "0px",
        }}
        className=" flex outline-main outline  justify-start items-center w-full rounded-2xl p-4 bg-container"
      >
        <img
          className=" w-7 h-7"
          src={calender_main}
        />
        <div className="ml-2">
          <div className=" text-sm text-dark font-bold">
            {String(formDateTime).slice(0, 10)}
          </div>{" "}
          <div className=" text-xs text-secondary font-semibold">
            date
          </div>{" "}
        </div>
      </Touchable>
      <AnimatePresence>
        {openMenu === "date" && (
          <motion.div
            initial={{ height: "0", opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: "0", opacity: 0 }}
            transition={generalTransition}
            className="  mt-2 overflow-hidden w-[90%] "
          >
            <Calendar
              className=""
              mode="single"
              selected={
                dayjs(formDateTime).toDate() ||
                new Date()
              }
              onSelect={(dateChoosen) => {
                dispatch(
                  modifyDateInForm(
                    dayjs(dateChoosen).toString()
                  )
                );
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Touchable
        onClick={() => setIsOpenMenu("time")}
        animate={{
          outlineOffset:
            openMenu === "time" ? "-2px" : "0px",
          outlineWidth:
            openMenu === "time" ? "2px" : "0px",
        }}
        className=" flex mt-2 outline-main outline  justify-start items-center w-full rounded-2xl p-4 bg-container"
      >
        <img className=" w-7 h-7" src={clock_main} />
        <div className="ml-2">
          <div className=" text-sm text-dark font-bold">
            {String(
              dayjs(formDateTime).format("HH:mm")
            )}
          </div>{" "}
          <div className=" text-xs text-secondary font-semibold">
            time
          </div>{" "}
        </div>
      </Touchable>
      <AnimatePresence>
        {openMenu === "time" && (
          <motion.div
            className=" w-full overflow-hidden pt-2"
            initial={{ height: "0", opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: "0", opacity: 0 }}
            transition={generalTransition}
          >
            <TimePicker />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stage3;
