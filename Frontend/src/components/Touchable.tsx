import React from "react";
import { AnimationControls, motion, TargetAndTransition, VariantLabels } from "framer-motion";
import generalTransition from "../lib/generalTransition";

type FrmaerAnimationProps = AnimationControls | TargetAndTransition | VariantLabels | boolean | undefined;
const Touchable = ({
  children,
  className,
  onClick,
  animate,
  tapBackgroundColor,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  animate?: FrmaerAnimationProps;
  tapBackgroundColor?: string;
}) => {
  return (
    <motion.div
      onClick={onClick}
      animate={animate}
      className={className}
      whileTap={{ backgroundColor: !!tapBackgroundColor ? tapBackgroundColor : "#D6DBDE" }}
      transition={{
        ...generalTransition,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Touchable;
