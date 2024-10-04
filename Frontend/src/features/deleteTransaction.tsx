import React from "react";
import Touchable from "../components/Touchable";
import { AnimatePresence } from "framer-motion";
import exit_main from "@/assets/exit_main.svg";
import Icon from "../components/Icon";
import { motion } from "framer-motion";
import generalTransition from "@/lib/generalTransition";
import { DrawerPortal } from "../components/drawer";
import { useAppDispatch } from "@/hooks/hooks";
import getAllDataFromAPI from "@/lib/getAllDataFromAPI";
import { deleteTransactionAsyncThunk } from "@/redux/transactionsSlice";
import DeleteWarning from "./DeleteWarning";

const DeleteTransaction = ({
  isDialogOpen,
  setIsDialogOpen,
  transactionId,
}: {
  isDialogOpen: boolean;
  transactionId: string;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const onConfirmDelete = async () => {
    await dispatch(deleteTransactionAsyncThunk(transactionId));
    setIsDialogOpen(false);
    await getAllDataFromAPI(dispatch);
  };

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
                className=" w-full shadow-xl justify-between pointer-events-auto  items-start p-4 flex-col flex mx-4 rounded-2xl bg-surface"
              >
                <div className=" w-full">
                  <div>
                    <Icon src={exit_main} varient="mid" />
                  </div>
                </div>
                <DeleteWarning onConfirmDelete={() => onConfirmDelete()} onCancel={() => setIsDialogOpen(false)} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}
    </DrawerPortal>
  );
};

export default DeleteTransaction;
