import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import caret_secondary from "@/assets/caret_secondary.svg";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("    ", className)}
      classNames={{
        months: "flex font-semibold flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: " space-y-4 ",
        caption:
          "flex  font-semibold justify-center w-full text-sm   relative items-center text-secondary",
        caption_label: "font-semibold text-md ",
        nav: "font-bold space-x-1 flex items-center",

        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse ",
        head_row: "flex",
        head_cell: "text-dark rounded-md w-full font-bold text-sm dark:text-neutral-400",
        row: "flex justify-between w-full ",
        cell: cn(
          "relative m-1 hover:text-surface  w-full rounded-lg flex justify-center  items-center aspect-square w-full text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-neutral-100 [&:has([aria-selected].day-outside)]:bg-neutral-100/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-neutral-800 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          "h-full transition-all tr font-semibold rounded-lg w-full justify-center flex flex-col items-center  hover:bg-main aria-selected:opacity-"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-main  text-surface hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today:
          "bg-secondary  hover:text-surface   text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50",
        day_outside:
          "day-outside  hover:text-surface text-neutral-500 opacity-50  aria-selected:bg-neutral-100/50 aria-selected:text-neutral-500 aria-selected:opacity-30 dark:text-neutral-400 dark:aria-selected:bg-neutral-800/50 dark:aria-selected:text-neutral-400",
        day_disabled: "text-neutral-500 bg-dark dark:text-neutral-400",
        day_range_middle:
          "aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <img src={caret_secondary} className="h-3 w-3 rotate-90" />,
        IconRight: () => <img src={caret_secondary} className="h-3 w-3 -rotate-90" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
