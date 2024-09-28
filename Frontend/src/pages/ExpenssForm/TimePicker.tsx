import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import dayjs from "dayjs";
import * as React from "react";
import { motion } from "framer-motion";
import generalTransition from "@/lib/generalTransition";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { modifyHoursInForm } from "@/redux/formSlice";

const TimePicker = () => {
  const dispatch = useAppDispatch();

  const [minutesCarouselApi, setMinutesCarouselApi] = React.useState<CarouselApi>();
  const [selectedMinute, setSelectedMinute] = React.useState(dayjs().minute());
  const [hoursCarouselApi, setHoursCarouselApi] = React.useState<CarouselApi>();
  const [selectedHour, setSelectedHour] = React.useState(dayjs().hour());

  React.useEffect(() => {
    if (!minutesCarouselApi) {
      return;
    }
    minutesCarouselApi.on("select", () => {
      const minutes = minutesCarouselApi.selectedScrollSnap() + 1;
      dispatch(modifyHoursInForm({ type: "minutes", value: minutes }));
      setSelectedMinute(minutes !== 60 ? minutes : 0);
    });
  }, [minutesCarouselApi]);

  React.useEffect(() => {
    if (!hoursCarouselApi) {
      return;
    }
    hoursCarouselApi.on("select", () => {
      const hours = hoursCarouselApi.selectedScrollSnap() + 1;
      dispatch(modifyHoursInForm({ type: "hours", value: hours }));
      setSelectedHour(hours !== 24 ? hours : 0);
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
                {index === 0 ? "00" : index}
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
                {index === 0 ? "00" : index}
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
export default TimePicker;
