import React from "react";
import blob1 from "@/assets/blob1.svg";
import blob2 from "@/assets/blob2.svg";
import blob3 from "@/assets/blob3.svg";
import visa_surface from "@/assets/visa_surface.svg";
import nfc from "@/assets/nfc.svg";

const Card = () => {
  return (
    <div
      style={{ boxShadow: "0px 0px 0px #4B63E6" }}
      className=" w-full    bg-[#4B63E6] aspect-[9/5] rounded-2xl relative "
    >
      <div className=" absolute w-full h-full flex justify-center  -z-10 -bottom-4">
        <div className="  bg-[#4B63E6]/20 w-[90%]  rounded-2xl   h-full"></div>
      </div>
      <div className=" flex flex-col p-6 justify-between items-start w-full h-full overflow-hidden">
        <img src={blob1} className=" w-1/2 absolute -top-8 -left-8" alt="" />
        <img src={blob2} className=" w-1/2 absolute -bottom-24 left-24 -rotate-45" alt="" />
        <img src={blob3} className=" w-4/6 absolute -top-32 -right-16 rotate-180" alt="" />
        <div className=" flex justify-between items-start w-full ">
          <div className="text-xl font-bold mb-2 text-surface"> Amir wais account</div>{" "}
          <img className="w-7" src={nfc} alt="" />
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
