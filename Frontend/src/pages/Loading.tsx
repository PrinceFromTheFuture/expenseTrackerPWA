import React from "react";
import { motion } from "framer-motion";
import generalTransition from "@/lib/generalTransition";
import app_icon from "/app_icon.svg";

const Loading = () => {
  return (
    <motion.div
      transition={generalTransition}
      initial={{ opacity: 1, top: 0 }}
      animate={{ opacity: 1, top: 0 }}
      exit={{ opacity: 0, top: 40 }}
      className="bg-surface inset-0 fixed    p-4 flex justify-center items-center flex-col  "
    >
      <div className=" relative mb-4  flex">
        {" "}
        <div className="w-8 h-8  border-[5px] rounded-full border-transparent  "></div>
        <div className=" w-8 h-8   absolute  animate-spin ">
          <svg className=" w-full  ">
            <circle
              r="13.5px"
              stroke="#0D6680 "
              cx="16px"
              cy="16px"
              strokeWidth="5px"
              fill="none"
              strokeDasharray="28 900 "
              className=" circlet"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default Loading;
