import React from "react";
import Touchable from "./Touchable";
import { AnimatePresence } from "framer-motion";
import exit_main from "@/assets/exit_main.svg";
import Icon from "../Icon";
import { motion } from "framer-motion";
import generalTransition from "@/generalTransition";
import { DrawerPortal } from "../drawer";

const DeleteTransaction = ({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <DrawerPortal>
      {isDialogOpen && (
        <AnimatePresence>
          <motion.div
            transition={generalTransition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" inset-0  z-50 fixed bg-black/40 flex justify-center items-center"
          >
            <AnimatePresence>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={generalTransition}
                className=" w-full gap-8 justify-between pointer-events-auto  items-start p-4 flex-col flex mx-4 rounded-2xl bg-surface"
              >
                <div className=" w-full">
                  <div>
                    <Icon src={exit_main} varient="mid" />
                  </div>
                </div>
                <div className=" w-full  flex flex-col justify-center items-center ">
                  <div className=" text-xl mb-2  text-dark font-bold">Are you sure?!</div>

                  <div className=" w-full  flex flex-col justify-center items-center ">
                    <div className=" text-md text-center  mb-2 text-secondary font-semibold">
                      This action cannot be undone. This will permanently delete{" "}
                    </div>
                  </div>
                </div>
                <div className=" w-full justify-between flex items-center gap-2">
                  <div className=" w-full ">
                    <Touchable
                      onClick={() => setIsDialogOpen(false)}
                      className=" w-full text-center bg-warning rounded-2xl font-semibold text-surface p-4"
                    >
                      Delete
                    </Touchable>
                  </div>
                  <div className=" w-full ">
                    <Touchable
                      onClick={() => {
                        setIsDialogOpen(false);
                        console.log("err");
                      }}
                      className=" flex justify-center items-center gap-2 w-full bg-container rounded-2xl font-semibold text-secondary p-4"
                    >
                      <div>Cancel</div>
                    </Touchable>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
    </DrawerPortal>
  );
};

export default DeleteTransaction;
