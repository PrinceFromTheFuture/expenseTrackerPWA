import generalTransition from "@/generalTransition";
import {  motion } from "framer-motion";
import { Link,  } from "react-router-dom";

const NewExpenss = () => {
  return (
    <motion.div
      transition={generalTransition}
      initial={{ opacity: 0, top: 20 }}
      animate={{ opacity: 1, top: 0 }}
      exit={{ opacity: 0, top: 20 }}
      className=" bg-surface inset-0 fixed"
    >
      <Link to={"/"} className=" bg-black p-24">
        fdf
      </Link>
    </motion.div>
  );
};

export default NewExpenss;
