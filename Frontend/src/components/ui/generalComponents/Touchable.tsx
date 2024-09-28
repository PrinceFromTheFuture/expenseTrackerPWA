import React from "react";
import { AnimationControls, motion, TargetAndTransition, VariantLabels } from "framer-motion";
import generalTransition from "../../../lib/generalTransition";

type FrmaerAnimationProps = AnimationControls | TargetAndTransition | VariantLabels | boolean;
const Touchable = ({
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
      }}
    >
      {children}
    </motion.div>
  );
};

export default Touchable;
