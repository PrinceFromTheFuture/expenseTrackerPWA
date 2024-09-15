import React from "react";
import { motion } from "framer-motion";
import generalTransition from "./generalTransition";

const Tuchable = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={className}
      whileTap={{ backgroundColor: "#D6DBDE" }}
      transition={generalTransition}
    >
      {children}
    </motion.div>
  );
};

export default Tuchable;
