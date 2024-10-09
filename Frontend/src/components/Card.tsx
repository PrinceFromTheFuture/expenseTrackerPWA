import React from "react";
import blob1 from "@/assets/blob1.svg";
import blob2 from "@/assets/blob2.svg";
import blob3 from "@/assets/blob3.svg";
import visa_surface from "@/assets/visa_surface.svg";
import nfc from "@/assets/nfc.svg";
import hexToRgba from "@/lib/hexToRgba";
import { Skeleton } from "./skeleton";

const Card = ({ color, name, isPending }: { color?: string; name?: string; isPending: boolean }) => {
  if (isPending) {
    return (
      <Skeleton className="w-full aspect-[9/5] rounded-2xl relative p-6 flex flex-col justify-between">
        <div className=" flex justify-between items-start">
          <Skeleton className=" w-48 h-8" />
          <Skeleton className=" h-14 w-14" />
        </div>{" "}
        <Skeleton className=" w-36 h-6" />
        <div className=" flex justify-end">
          <Skeleton className=" w-24 h-10" />
        </div>
      </Skeleton>
    );
  }
  return (
    <div
      style={{ boxShadow: `0px 0px 10px ${hexToRgba(`#${color}`, 0.5)}`, backgroundColor: `#${color}` }}
      className={` w-full    aspect-[9/5] rounded-2xl relative `}
    >
      <div className=" overflow-hidden absolute w-full h-full">
        <img src={blob1} className=" w-1/2 absolute -top-8 -left-8" alt="" />
        <img src={blob2} className=" w-1/2 absolute -bottom-24 left-24 -rotate-45" alt="" />
        <img src={blob3} className=" w-4/6 absolute -top-32 -right-16 rotate-180" alt="" />
      </div>
      <div className=" absolute w-full h-full flex justify-center  -z-10 -bottom-4">
        <div className={`bg-[#${color}]/20 w-[90%]  rounded-2xl   h-full`}></div>
      </div>
      <div className=" flex flex-col p-6 justify-between items-start w-full h-full overflow-hidden">
        <div className=" flex justify-between items-start w-full ">
          <div className="text-xl font-bold mb-2 text-surface"> {name}</div> <img className="w-7" src={nfc} alt="" />
        </div>
        <div className=" text-xl font-semibold mb-2 text-surface tracking-widest">•••• •••• •••• 1234</div>
        <div className=" w-full flex  h-6 justify-end items-end">
          <img src={visa_surface} className=" h-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Card;
