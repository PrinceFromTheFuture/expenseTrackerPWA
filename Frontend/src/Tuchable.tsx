import React from "react";
import { motion } from "framer-motion";

const Tuchable = ({ children, className }: { children: React.ReactNode; className: string }) => {
  return (
    <motion.div
      className={className}
      whileTap={{ backgroundColor: "#D6DBDE" }}
      transition={{
        ease: "easeIn",
        bounce: 100,
        duration: 0.1,
        damping: 0,
        bounceStiffness: 0,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Tuchable;
