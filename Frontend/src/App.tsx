import React, { useRef, useState } from "react";
import facebookTest from "@/assets/facebookTest.svg";
import ExpensesWidget from "./ExpensesWidget";
import ExpensesWidgetIdea from "./ExpensesWidgetIdea";
import edit_main from "@/assets/edit_main.svg";

import { AnimatePresence, motion } from "framer-motion";
import Icon from "./components/ui/Icon";
import AnimationTest from "./SuccessBanner";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  return (
    <div className=" w-full fixed inset-0 bg-surface select-none font-montserrat ">
      <motion.div
        whileHover={{ scale: 1.02, backgroundColor: "rgb(198, 208, 220)" }}
        whileTap={{ scale: 0.98, backgroundColor: "#f1f5f9  " }}
        ref={itemRef}
        onClick={() => setIsOpen(!isOpen)}
        className="  bg-slate-100 border-lime-100 text-white p-5 rounded-lg select-none cursor-pointer"
      >
        Expense tracher
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed  rounded-lg select-none cursor-pointer shadow-lg p-4"
            style={{ backgroundColor: "#f1f5f9  " }}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.2,
            }}
            onClick={() => setIsOpen(!isOpen)}
            layout
            initial={{
              top: itemRef.current!.getBoundingClientRect().top,
              left: itemRef.current!.getBoundingClientRect().left,
              width: itemRef.current!.getBoundingClientRect().width,
              height: itemRef.current!.getBoundingClientRect().height,
            }}
            animate={{
              top: 20,
              left: 20,
              right: 20,
              bottom: 20,
              width: "100%",
              height: "100%",
            }}
            exit={{
              top: itemRef.current!.getBoundingClientRect().top,
              left: itemRef.current!.getBoundingClientRect().left,
              width: itemRef.current!.getBoundingClientRect().width,
              height: itemRef.current!.getBoundingClientRect().height,
            }}
          >
            fjkl
          </motion.div>
        )}
      </AnimatePresence>
      <div>
        <input type="date" />
        date
      </div>

      <ExpensesWidget />
      <AnimationTest />
    </div>
  );
};

export default App;
