import { Calendar } from "@/components/ui/calendar";
import Tuchable from "@/Tuchable";
import { motion } from "framer-motion";
import calender_main from "@/assets/calender_main.svg";
import clock_main from "@/assets/clock_main.svg";

import { useState } from "react";
import generalTransition from "@/generalTransition";
const Stage3 = () => {
  const [openMenu, setIsOpenMenu] = useState<
    "date" | "time"
  >("date");
  const [date, setDate] = useState<Date | undefined>(
    new Date()
  );
  return (
    <div className=" w-full my-4 h-full flex justify-start flex-col items-center">
      <div className="text-secondary mb-4 font-semibold text-base">
        choose budget category
      </div>
      <Tuchable
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
            {String(date).slice(0, 10)}
          </div>{" "}
          <div className=" text-xs text-secondary font-semibold">
            date
          </div>{" "}
        </div>
      </Tuchable>
      <motion.div
        animate={{
          height: openMenu === "date" ? "auto" : "0%",
          opacity: openMenu === "date" ? 1 : 0,
        }}
        transition={generalTransition}
        className="  overflow-hidden w-[90%] "
      >
        <Calendar
          className="mt-4"
          mode="single"
          selected={date}
          onSelect={(a, dateChoosen) => {
            setDate(dateChoosen);
          }}
          onDayFocus={() => console.log("fds")}
        />
      </motion.div>
      <Tuchable
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
            {String(date).slice(0, 10)}
          </div>{" "}
          <div className=" text-xs text-secondary font-semibold">
            time
          </div>{" "}
        </div>
      </Tuchable>
    </div>
  );
};

export default Stage3;
