import delete_surfce from "@/assets/delete_surface.svg";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import Tuchable from "@/Tuchable";
import React from "react";

const NumberInputBox = ({
  backgroundColor,
  content,
}: {
  backgroundColor?: "bg-secondary" | "bg-container";
  content: React.ReactNode | string;
  action?: () => void;
}) => {
  return (
    <Tuchable
      className={cn(
        "   aspect-square rounded-2xl flex justify-center items-center w-full   font-semiboldbold   text-dark text-lg",
        backgroundColor || "bg-transparent"
      )}
    >
      {content}
    </Tuchable>
  );
};

const Stage1 = () => {
  return (
    <div className=" w-full h-full m-4 flex flex-col justify-between items-center">
      <div className="text-secondary mb-1 font-semibold text-base">expensess amount</div>
      <div></div>
      <div className=" w-full flex    flex-col gap-4 justify-between items-center">
        <div className=" w-full  flex justify-between items-center gap-4">
          <NumberInputBox content={1} />
          <NumberInputBox content={2} />

          <NumberInputBox content={3} />

          <NumberInputBox
            backgroundColor="bg-secondary"
            content={
              <div className="w-7">
                <Icon varient="full" src={delete_surfce} />
              </div>
            }
          />
        </div>
        <div className=" w-full  flex justify-between items-center gap-4">
          <NumberInputBox content={4} />
          <NumberInputBox content={5} />

          <NumberInputBox content={6} />

          <NumberInputBox
            backgroundColor="bg-container"
            content={<div className="font-bold text-4xl">+</div>}
          />
        </div>
        <div className=" w-full  flex justify-between items-center gap-4">
          <NumberInputBox content={7} />
          <NumberInputBox content={8} />

          <NumberInputBox content={9} />

          <NumberInputBox
            backgroundColor="bg-container"
            content={<div className="font-bold text-4xl">-</div>}
          />
        </div>
        <div className=" w-full  flex justify-between items-center gap-4">
          <NumberInputBox content={"00"} />
          <NumberInputBox content={0} />

          <NumberInputBox content={"."} />

          <NumberInputBox
            backgroundColor="bg-container"
            content={<div className="font-bold text-4xl">x</div>}
          />
        </div>
      </div>
    </div>
  );
};

export default Stage1;
