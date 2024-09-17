import { Calendar } from "@/components/ui/calendar";
import Tuchable from "@/Tuchable";
import { AnimatePresence, motion } from "framer-motion";
import calender_main from "@/assets/calender_main.svg";
import clock_main from "@/assets/clock_main.svg";

import React, { useState } from "react";
import generalTransition from "@/generalTransition";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import dayjs from "dayjs";

const TimerSelctor = () => {
  const [minutesCarouselApi, setMinutesCarouselApi] = React.useState<CarouselApi>();
  const [selectedMinute, setSelectedMinute] = React.useState(dayjs().minute());
  const [hoursCarouselApi, setHoursCarouselApi] = React.useState<CarouselApi>();
  const [selectedHour, setSelectedHour] = React.useState(dayjs().hour());

  React.useEffect(() => {
    if (!minutesCarouselApi) {
      return;
    }
    minutesCarouselApi.on("select", () => {
      setSelectedMinute(minutesCarouselApi.selectedScrollSnap() + 1);
    });
  }, [minutesCarouselApi]);

  React.useEffect(() => {
    if (!hoursCarouselApi) {
      return;
    }
    hoursCarouselApi.on("select", () => {
      setSelectedHour(hoursCarouselApi.selectedScrollSnap() + 1);
    });
  }, [hoursCarouselApi]);
  return (
    <div className=" w-full max-h-[300px] overflow-hidden flex justify-between items-center py-8  border-container border-2 rounded-2xl">
      <Carousel
        setApi={setHoursCarouselApi}
        opts={{
          align: "start",
          loop: true,
          skipSnaps: true,
          startIndex: dayjs().hour() - 1,
        }}
        orientation="vertical"
        className="w-full   "
      >
        <CarouselContent className=" h-[200px]">
          {Array.from({ length: 24 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="  basis-1/3 h-[800px] justify-center flex items-center"
            >
              <motion.div
                className=" text-4xl font-extrabold"
                animate={{ color: index === selectedHour ? "#171c1f" : "#9daab0" }}
                transition={generalTransition}
              >
                {index === 0 ? 24 : index}
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className=" text-dark  font-black text-4xl">:</div>
      <Carousel
        setApi={setMinutesCarouselApi}
        opts={{
          align: "start",
          loop: true,
          skipSnaps: true,
          startIndex: dayjs().minute() - 1,
        }}
        orientation="vertical"
        className="w-full   "
      >
        <CarouselContent className=" h-[200px]">
          {Array.from({ length: 60 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="  basis-1/3 h-[800px] justify-center flex items-center"
            >
              <motion.div
                className=" text-4xl font-extrabold"
                animate={{ color: index === selectedMinute ? "#171c1f" : "#9daab0" }}
                transition={generalTransition}
              >
                {index === 0 ? 60 : index}
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

const Stage3 = () => {
  const [openMenu, setIsOpenMenu] = useState<"date" | "time">("date");
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className=" w-full my-4 h-full flex justify-start flex-col items-center">
      <div className="text-secondary mb-4 font-semibold text-base">choose budget category</div>
      <Tuchable
        onClick={() => setIsOpenMenu("date")}
        animate={{
          outlineOffset: openMenu === "date" ? "-2px" : "0px",
          outlineWidth: openMenu === "date" ? "2px" : "0px",
        }}
        className=" flex outline-main outline  justify-start items-center w-full rounded-2xl p-4 bg-container"
      >
        <img className=" w-7 h-7" src={calender_main} />
        <div className="ml-2">
          <div className=" text-sm text-dark font-bold">{String(date).slice(0, 10)}</div>{" "}
          <div className=" text-xs text-secondary font-semibold">date</div>{" "}
        </div>
      </Tuchable>
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
              selected={date}
              onSelect={(_, dateChoosen) => {
                setDate(dateChoosen);
              }}
              onDayFocus={() => console.log("fds")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Tuchable
        onClick={() => setIsOpenMenu("time")}
        animate={{
          outlineOffset: openMenu === "time" ? "-2px" : "0px",
          outlineWidth: openMenu === "time" ? "2px" : "0px",
        }}
        className=" flex mt-2 outline-main outline  justify-start items-center w-full rounded-2xl p-4 bg-container"
      >
        <img className=" w-7 h-7" src={clock_main} />
        <div className="ml-2">
          <div className=" text-sm text-dark font-bold">{String(date).slice(0, 10)}</div>{" "}
          <div className=" text-xs text-secondary font-semibold">time</div>{" "}
        </div>
      </Tuchable>
      <AnimatePresence>
        {openMenu === "time" && (
          <motion.div
            className=" w-full overflow-hidden pt-2"
            initial={{ height: "0", opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: "0", opacity: 0 }}
            transition={generalTransition}
          >
            <TimerSelctor />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stage3;
