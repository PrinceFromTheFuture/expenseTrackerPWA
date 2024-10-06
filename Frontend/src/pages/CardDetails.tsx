import React from "react";
import { motion } from "framer-motion";
import generalTransition from "@/lib/generalTransition";
import arrow_main from "@/assets/arrow_main.svg";
import Icon from "@/components/Icon";
import Card from "@/features/Card";

const CardDetails = () => {
  return (
    <motion.div
      transition={generalTransition}
      initial={{ opacity: 0, left: 40, right: -40 }}
      animate={{ opacity: 1, left: 0, right: 0 }}
      exit={{ opacity: 0, left: 40, right: -40 }}
      className="bg-surface inset-0 fixed   p-4    overflow-hidden w-full h-full"
    >
      <div className=" mb-4">
        <Icon varient="mid" src={arrow_main} />
      </div>
      <div className="">
        {" "}
        <Card />
      </div>
    </motion.div>
  );
};

export default CardDetails;
