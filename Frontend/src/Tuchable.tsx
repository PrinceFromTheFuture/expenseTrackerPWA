import React from "react";
import { motion } from "framer-motion";
import generalTransition from "./generalTransition";

const Tuchable = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      whileTap={{ backgroundColor: "#D6DBDE" }}
      transition={generalTransition}
    >
      {children}
    </motion.div>
  );
};

export default Tuchable;
