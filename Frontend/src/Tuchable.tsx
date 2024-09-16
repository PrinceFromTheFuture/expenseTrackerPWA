import React from "react";
import {
  AnimationControls,
  AnimationProps,
  motion,
  TargetAndTransition,
  VariantLabels,
} from "framer-motion";
import generalTransition from "./generalTransition";

type FrmaerAnimationProps =
  | AnimationControls
  | TargetAndTransition
  | VariantLabels
  | boolean;
const Tuchable = ({
  children,
  className,
  onClick,
  animate,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  animate?: FrmaerAnimationProps;
}) => {
  return (
    <motion.div
      onClick={onClick}
      animate={animate}
      className={className}
      whileTap={{ backgroundColor: "#D6DBDE" }}
      transition={{
        ...generalTransition,
        duration: 0.08,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Tuchable;
