import delete_surfce from "@/assets/delete_surface.svg";
import Icon from "@/components/ui/Icon";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { formatAmountInAgorot } from "@/lib/formatAmountInAgorot";
import { cn } from "@/lib/utils";
import {
  addNumberToFormAmount,
  decreaseNumberFromFormAmount,
  formAmountSelctor,
  addOneToFormAmount,
  clearNumberFromFormAmount,
  decreaseOneFromFormAmount,
} from "@/redux/formSlice";
import { userBalanceSelector } from "@/redux/userSlice";
import Tuchable from "@/Tuchable";
import React from "react";

const NumberInputBox = ({
  backgroundColor,
  content,
  onClick,
}: {
  backgroundColor?: "bg-secondary" | "bg-container";
  content: React.ReactNode | string;
  onClick: () => void;
}) => {
  return (
    <Tuchable
      onClick={() => {
        onClick();
        navigator.vibrate(25);
      }}
      className={cn(
        "   aspect-square rounded-2xl flex justify-center items-center w-full   font-bold   text-dark text-lg",
        backgroundColor || "bg-surface"
      )}
    >
      {content}
    </Tuchable>
  );
};

const Stage1 = () => {
  const balance = useAppSelector(userBalanceSelector);

  const formAmount = useAppSelector(formAmountSelctor);

  const dispatch = useAppDispatch();

  const handleAddDigitToFormAmount = (digit: number) => {
    dispatch(addNumberToFormAmount(digit));
  };
  const handleDecreaseNumberFromFormAmount = () => {
    dispatch(decreaseNumberFromFormAmount());
  };

  const handleAddOneToFormAmount = () => {
    dispatch(addOneToFormAmount());
  };

  const handleClearNumberFromFormAmount = () => {
    dispatch(clearNumberFromFormAmount());
  };

  const handleDecreaseOneFromFormAmount = () => {
    dispatch(decreaseOneFromFormAmount());
  };

  return (
    <div className=" w-full h-full m-4 flex flex-col justify-between items-center">
      <div className="text-secondary mb-1 font-semibold text-base">
        expensess amount
      </div>
      <div
        className=" w-full p-4 
      py-6 border-container border-2 rounded-2xl flex justify-center items-start flex-col"
      >
        <div className=" border-b-2 border-secondary w-full flex justify-between items-center pb-1">
          <div className=" font-bold text-lg invisible">X</div>
          <div className=" flex gap-1 justify-center items-top">
            <div className=" text-4xl text-dark font-extrabold">
              {formatAmountInAgorot(formAmount, false)}
            </div>
            <div className="  text-main font-extrabold text-2xl">₪</div>
          </div>
          <div
            className=" font-bold text-lg"
            onClick={() => handleClearNumberFromFormAmount()}
          >
            X
          </div>
        </div>
        <div className="mt-2 flex justify-start gap-2 items-end">
          <div className=" font-semibold text-secondary text-sm ">
            current balance:
          </div>
          <div className=" font-bold text-dark text-sm ">
            {formatAmountInAgorot(balance)}
          </div>
        </div>
      </div>
      <div className=" w-full flex    flex-col gap-4 justify-between items-center">
        <div className=" w-full  flex justify-between items-center gap-8">
          <NumberInputBox
            onClick={() => handleAddDigitToFormAmount(1)}
            content={1}
          />
          <NumberInputBox
            onClick={() => handleAddDigitToFormAmount(2)}
            content={2}
          />

          <NumberInputBox
            onClick={() => handleAddDigitToFormAmount(3)}
            content={3}
          />

          <NumberInputBox
            onClick={() => handleDecreaseNumberFromFormAmount()}
            backgroundColor="bg-secondary"
            content={
              <div className="w-6">
                <Icon varient="full" src={delete_surfce} />
              </div>
            }
          />
        </div>
        <div className=" w-full  flex justify-between items-center gap-8">
          <NumberInputBox
            onClick={() => handleAddDigitToFormAmount(4)}
            content={4}
          />
          <NumberInputBox
            onClick={() => handleAddDigitToFormAmount(5)}
            content={5}
          />

          <NumberInputBox
            onClick={() => handleAddDigitToFormAmount(6)}
            content={6}
          />

          <NumberInputBox
            onClick={() => handleAddOneToFormAmount()}
            backgroundColor="bg-container"
            content={<div className="font-bold text-3xl">+</div>}
          />
        </div>
        <div className=" w-full  flex justify-between items-center gap-8">
          <NumberInputBox
            onClick={() => handleAddDigitToFormAmount(7)}
            content={7}
          />
          <NumberInputBox
            onClick={() => handleAddDigitToFormAmount(8)}
            content={8}
          />

          <NumberInputBox
            onClick={() => handleAddDigitToFormAmount(9)}
            content={9}
          />

          <NumberInputBox
            onClick={() => handleDecreaseOneFromFormAmount()}
            backgroundColor="bg-container"
            content={<div className="font-bold text-3xl">-</div>}
          />
        </div>
        <div className=" w-full  flex justify-between items-center gap-8">
          <NumberInputBox
            onClick={() => {
              handleAddDigitToFormAmount(0);
              handleAddDigitToFormAmount(0);
            }}
            content={"00"}
          />
          <NumberInputBox
            onClick={() => handleAddDigitToFormAmount(0)}
            content={0}
          />

          <NumberInputBox onClick={() => {}} content={"."} />

          <NumberInputBox
            onClick={() => handleClearNumberFromFormAmount()}
            backgroundColor="bg-container"
            content={<div className="font-bold text-3xl">x</div>}
          />
        </div>
      </div>
    </div>
  );
};

export default Stage1;
